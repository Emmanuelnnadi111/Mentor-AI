'use client';

import { useFormState } from 'react-dom';
import { useState, useEffect, useRef } from 'react';
import { getNextStep, type ProblemSolvingState } from '@/lib/actions';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { SubmitButton } from '@/components/submit-button';
import { MarkdownResponse } from '@/components/markdown-response';
import { Terminal, Bot, User, Milestone } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

type Step = {
  type: 'user' | 'bot';
  content: string;
  explanation?: string;
};

const initialState: ProblemSolvingState = {
  step: undefined,
  explanation: undefined,
  error: undefined,
};

export default function GuidedProblemSolvingPage() {
  const [problem, setProblem] = useState('');
  const [studentLevel, setStudentLevel] = useState('high school');
  const [steps, setSteps] = useState<Step[]>([]);
  const [state, formAction] = useFormState(getNextStep, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state.step && state.explanation) {
      setSteps((prev) => [...prev, { type: 'bot', content: state.step!, explanation: state.explanation }]);
      formRef.current?.reset();
    }
  }, [state]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [steps]);

  const handleNewProblem = (formData: FormData) => {
    const newProblem = formData.get('problem') as string;
    setProblem(newProblem);
    setStudentLevel(formData.get('studentLevel') as string);
    setSteps([{ type: 'user', content: newProblem }]);
    formAction(formData);
  };
  
  const previousStepsContent = steps.filter(s => s.type === 'bot').map(s => s.content).join('\n');

  return (
    <div className="grid flex-1 items-start gap-4">
      <Card>
        <form action={steps.length === 0 ? handleNewProblem : formAction} ref={formRef}>
          <CardHeader>
            <CardTitle>Guided Problem Solving</CardTitle>
            <CardDescription>
              Get step-by-step guidance. Break down complex questions into smaller, manageable steps with AI assistance.
            </CardDescription>
          </CardHeader>
          {steps.length === 0 ? (
            <CardContent>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="problem">Problem</Label>
                  <Textarea
                    id="problem"
                    name="problem"
                    placeholder="e.g., How do I build a binary search tree in Python?"
                    className="min-h-32"
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="studentLevel">Understanding Level</Label>
                  <Select name="studentLevel" defaultValue={studentLevel}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high school">High School</SelectItem>
                      <SelectItem value="undergraduate">Undergraduate</SelectItem>
                      <SelectItem value="graduate">Graduate</SelectItem>
                      <SelectItem value="expert">Expert</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          ) : (
            <CardContent>
              <div
                ref={scrollAreaRef}
                className="space-y-4 max-h-[50vh] overflow-y-auto p-4 border rounded-md"
              >
                {steps.map((step, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="flex-shrink-0">
                      {step.type === 'user' ? 
                        <User className="w-6 h-6 p-1 rounded-full bg-muted text-muted-foreground" /> : 
                        <Bot className="w-6 h-6 p-1 rounded-full bg-primary text-primary-foreground" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{step.type === 'user' ? 'You' : 'MentorAI'}</p>
                      <MarkdownResponse content={step.content} className="text-sm" />
                      {step.explanation && (
                        <Card className="mt-2 bg-secondary/50">
                           <CardHeader className="p-3 flex-row items-center gap-2">
                            <Milestone className="w-4 h-4 text-accent" />
                            <CardTitle className="text-sm">Explanation</CardTitle>
                          </CardHeader>
                          <CardContent className="p-3 pt-0">
                            <MarkdownResponse content={step.explanation} className="text-xs" />
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <input type="hidden" name="problem" value={problem} />
              <input type="hidden" name="studentLevel" value={studentLevel} />
              <input type="hidden" name="previousSteps" value={JSON.stringify(steps.filter(s => s.type === 'bot').map(s => s.content))} />
            </CardContent>
          )}

          <CardFooter className="border-t px-6 py-4">
            <SubmitButton>{steps.length === 0 ? 'Start Solving' : 'Get Next Step'}</SubmitButton>
            {steps.length > 0 && (
              <Button variant="outline" className="ml-2" onClick={() => { setSteps([]); setProblem(''); }}>
                Start New Problem
              </Button>
            )}
          </CardFooter>
          {state.error && (
            <CardContent>
              <Alert variant="destructive">
                <Terminal className="h-4 w-4" />
                <AlertDescription>{state.error}</AlertDescription>
              </Alert>
            </CardContent>
          )}
        </form>
      </Card>
    </div>
  );
}
