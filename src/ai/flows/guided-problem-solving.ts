'use server';

/**
 * @fileOverview An AI agent to guide students through problem-solving.
 *
 * - guidedProblemSolving - A function that guides the student to solve a problem by breaking it down into smaller steps.
 * - GuidedProblemSolvingInput - The input type for the guidedProblemSolving function.
 * - GuidedProblemSolvingOutput - The return type for the guidedProblemSolving function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GuidedProblemSolvingInputSchema = z.object({
  problem: z.string().describe('The complex problem to be solved.'),
  studentLevel: z.string().describe('The student level (e.g., high school, undergraduate).'),
  previousSteps: z.array(z.string()).optional().describe('The previous steps taken by the student.'),
});
export type GuidedProblemSolvingInput = z.infer<typeof GuidedProblemSolvingInputSchema>;

const GuidedProblemSolvingOutputSchema = z.object({
  step: z.string().describe('The next step to solve the problem.'),
  explanation: z.string().describe('The explanation of why this step is important.'),
});
export type GuidedProblemSolvingOutput = z.infer<typeof GuidedProblemSolvingOutputSchema>;

export async function guidedProblemSolving(input: GuidedProblemSolvingInput): Promise<GuidedProblemSolvingOutput> {
  return guidedProblemSolvingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'guidedProblemSolvingPrompt',
  input: {schema: GuidedProblemSolvingInputSchema},
  output: {schema: GuidedProblemSolvingOutputSchema},
  prompt: `You are an expert tutor, skilled at guiding students through complex problems.

  The student is at the {{{studentLevel}}} level.

  The problem to solve is:
  {{problem}}

  You will break down the problem into smaller, manageable steps. Provide the next step, and explain why it is the correct step.

  Previous steps taken (if any):
  {{#if previousSteps}}
    {{#each previousSteps}}
      - {{{this}}}
    {{/each}}
  {{else}}
    None
  {{/if}}
  `,
});

const guidedProblemSolvingFlow = ai.defineFlow(
  {
    name: 'guidedProblemSolvingFlow',
    inputSchema: GuidedProblemSolvingInputSchema,
    outputSchema: GuidedProblemSolvingOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
