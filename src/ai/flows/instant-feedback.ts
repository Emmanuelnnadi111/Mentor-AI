'use server';

/**
 * @fileOverview An AI agent that provides instant feedback on user submissions.
 *
 * - provideInstantFeedback - A function that provides feedback on a user's answer.
 * - InstantFeedbackInput - The input type for the provideInstantFeedback function.
 * - InstantFeedbackOutput - The return type for the provideInstantFeedback function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const InstantFeedbackInputSchema = z.object({
  question: z.string().describe('The question that the user is answering.'),
  answer: z.string().describe('The user\'s answer to the question.'),
  expectedAnswer: z.string().describe('The expected correct answer to the question.'),
  topic: z.string().describe('The topic of the question'),
});
export type InstantFeedbackInput = z.infer<typeof InstantFeedbackInputSchema>;

const InstantFeedbackOutputSchema = z.object({
  feedback: z.string().describe('Feedback on the user\'s answer.'),
  isCorrect: z.boolean().describe('Whether the answer is correct or not.'),
  hint: z.string().optional().describe('A hint to help the user improve their answer.'),
});
export type InstantFeedbackOutput = z.infer<typeof InstantFeedbackOutputSchema>;

export async function provideInstantFeedback(input: InstantFeedbackInput): Promise<InstantFeedbackOutput> {
  return instantFeedbackFlow(input);
}

const prompt = ai.definePrompt({
  name: 'instantFeedbackPrompt',
  input: {schema: InstantFeedbackInputSchema},
  output: {schema: InstantFeedbackOutputSchema},
  prompt: `You are an expert tutor specializing in providing instant feedback to students. Your goal is to help students learn by providing constructive criticism and hints.

You will use this information to assess the student\'s answer, and provide feedback.

Question: {{{question}}}
Student's Answer: {{{answer}}}
Expected Answer: {{{expectedAnswer}}}
Topic: {{{topic}}}

Determine if the student\'s answer is correct. Set the isCorrect output field appropriately.
Provide specific feedback on the student\'s answer, explaining what they did well and where they can improve. Be encouraging and supportive. If the answer is incorrect, provide a hint to help them improve their answer.`,
});

const instantFeedbackFlow = ai.defineFlow(
  {
    name: 'instantFeedbackFlow',
    inputSchema: InstantFeedbackInputSchema,
    outputSchema: InstantFeedbackOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
