'use client';

import { useFormState } from 'react-dom';
import { useState } from 'react';
import { getFeedback, type FeedbackState } from '@/lib/actions';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { SubmitButton } from '@/components/submit-button';
import { MarkdownResponse } from '@/components/markdown-response';
import { Terminal, CheckCircle2, XCircle, Lightbulb } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const practiceProblems = [
  {
    id: '1',
    topic: 'JavaScript',
    question: 'What is the output of `console.log(0.1 + 0.2 === 0.3)` in JavaScript and why?',
    expectedAnswer: 'The output is `false`. This is because of floating-point precision errors in binary representation. 0.1 and 0.2 cannot be represented perfectly in binary, leading to a sum that is slightly different from 0.3.',
  },
  {
    id: '2',
    topic: 'Python',
    question: 'Write a Python function to check if a string is a palindrome.',
    expectedAnswer: 'A simple way is to compare the string with its reverse. `def is_palindrome(s): return s == s[::-1]`',
  },
  {
    id: '3',
    topic: 'General Logic',
    question: 'A bat and a ball cost $1.10 in total. The bat costs $1.00 more than the ball. How much does the ball cost?',
    expectedAnswer: 'The ball costs $0.05. Let b be the cost of the ball. The bat costs b + 1. So, b + (b + 1) = 1.10. 2b + 1 = 1.10. 2b = 0.10. b = 0.05.',
  }
];

const initialState: FeedbackState = {
  feedback: undefined,
  isCorrect: undefined,
  hint: undefined,
  error: undefined,
};

export default function InstantFeedbackPage() {
  const [selectedProblem, setSelectedProblem] = useState(practiceProblems[0]);
  const [state, formAction] = useFormState(getFeedback, initialState);

  const handleProblemChange = (id: string) => {
    const newProblem = practiceProblems.find(p => p.id === id);
    if (newProblem) {
      setSelectedProblem(newProblem);
      // Reset form state when problem changes
      initialState.feedback = undefined;
      initialState.error = undefined;
    }
  }

  return (
    <div className="grid flex-1 items-start gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Instant Feedback</CardTitle>
          <CardDescription>
            Select a problem and submit your answer to receive immediate, AI-powered feedback and hints.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Label>Select a problem:</Label>
          <RadioGroup 
            defaultValue={selectedProblem.id} 
            onValueChange={handleProblemChange}
            className="my-2 grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {practiceProblems.map(p => (
              <div key={p.id}>
                <RadioGroupItem value={p.id} id={p.id} className="peer sr-only" />
                <Label
                  htmlFor={p.id}
                  className="flex flex-col items-start justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <span className="mb-1 font-semibold">{p.topic}</span>
                  <span className="text-sm text-muted-foreground">{p.question.substring(0, 50)}...</span>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>
      
      <Card>
        <form action={formAction}>
          <input type="hidden" name="question" value={selectedProblem.question} />
          <input type="hidden" name="expectedAnswer" value={selectedProblem.expectedAnswer} />
          <input type="hidden" name="topic" value={selectedProblem.topic} />
          <CardHeader>
            <CardTitle>{selectedProblem.topic} Problem</CardTitle>
            <CardDescription>{selectedProblem.question}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              <Label htmlFor="answer">Your Answer</Label>
              <Textarea
                id="answer"
                name="answer"
                placeholder="Type your solution here..."
                className="min-h-32"
                required
              />
            </div>
            {state.error && (
               <Alert variant="destructive" className="mt-4">
                  <Terminal className="h-4 w-4" />
                  <AlertDescription>{state.error}</AlertDescription>
               </Alert>
            )}
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <SubmitButton>Get Feedback</SubmitButton>
          </CardFooter>
        </form>
      </Card>
      {state.feedback && (
        <Alert variant={state.isCorrect ? "default" : "destructive"} className={state.isCorrect ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800" : ""}>
          {state.isCorrect ? <CheckCircle2 className="h-4 w-4 text-green-600" /> : <XCircle className="h-4 w-4" />}
          <AlertTitle className={state.isCorrect ? "text-green-800 dark:text-green-300" : ""}>
            {state.isCorrect ? "Correct!" : "Needs Improvement"}
          </AlertTitle>
          <AlertDescription>
            <MarkdownResponse content={state.feedback} />
          </AlertDescription>
        </Alert>
      )}
      {state.hint && !state.isCorrect && (
        <Alert>
          <Lightbulb className="h-4 w-4" />
          <AlertTitle>Hint</AlertTitle>
          <AlertDescription>
            <MarkdownResponse content={state.hint} />
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
