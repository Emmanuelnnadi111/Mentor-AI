'use client';

import { useFormState } from 'react-dom';
import { getExplanation, type ExplanationState } from '@/lib/actions';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { SubmitButton } from '@/components/submit-button';
import { MarkdownResponse } from '@/components/markdown-response';
import { Lightbulb, Terminal } from 'lucide-react';

const initialState: ExplanationState = {
  explanation: undefined,
  error: undefined,
};

export default function AdaptiveExplanationsPage() {
  const [state, formAction] = useFormState(getExplanation, initialState);

  return (
    <div className="grid flex-1 items-start gap-4">
      <Card>
        <form action={formAction}>
          <CardHeader>
            <CardTitle>Adaptive Explanations</CardTitle>
            <CardDescription>
              Generate explanations tailored to a specific level of understanding. The AI analyzes your query to create personalized content.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="query">Your Question</Label>
                <Textarea
                  id="query"
                  name="query"
                  placeholder="e.g., Explain the theory of relativity."
                  className="min-h-32"
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="userLevel">Understanding Level</Label>
                <Select name="userLevel" defaultValue="high school">
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
              {state.error && (
                 <Alert variant="destructive">
                    <Terminal className="h-4 w-4" />
                    <AlertDescription>{state.error}</AlertDescription>
                 </Alert>
              )}
            </div>
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <SubmitButton>Generate Explanation</SubmitButton>
          </CardFooter>
        </form>
      </Card>
      {state.explanation && (
        <Card>
          <CardHeader className="flex flex-row items-center gap-2">
            <Lightbulb className="h-5 w-5 text-accent" />
            <CardTitle>Generated Explanation</CardTitle>
          </CardHeader>
          <CardContent>
            <MarkdownResponse content={state.explanation} />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
