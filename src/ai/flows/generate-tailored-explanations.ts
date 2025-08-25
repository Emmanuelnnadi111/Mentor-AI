'use server';
/**
 * @fileOverview Generates explanations tailored to the user's understanding level.
 *
 * - generateTailoredExplanations - A function that generates tailored explanations.
 * - GenerateTailoredExplanationsInput - The input type for the generateTailoredExplanations function.
 * - GenerateTailoredExplanationsOutput - The return type for the generateTailoredExplanations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateTailoredExplanationsInputSchema = z.object({
  query: z.string().describe('The user query or topic for which an explanation is needed.'),
  userLevel: z
    .string()
    .describe(
      'The user understanding level, e.g., beginner, intermediate, advanced. If not provided, assume intermediate.'
    )
    .optional(),
  priorInteractions: z
    .string()
    .describe('A summary of prior interactions with the user.').optional(),
});
export type GenerateTailoredExplanationsInput = z.infer<typeof GenerateTailoredExplanationsInputSchema>;

const GenerateTailoredExplanationsOutputSchema = z.object({
  explanation: z.string().describe('The tailored explanation for the user query.'),
});
export type GenerateTailoredExplanationsOutput = z.infer<typeof GenerateTailoredExplanationsOutputSchema>;

export async function generateTailoredExplanations(
  input: GenerateTailoredExplanationsInput
): Promise<GenerateTailoredExplanationsOutput> {
  return generateTailoredExplanationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateTailoredExplanationsPrompt',
  input: {schema: GenerateTailoredExplanationsInputSchema},
  output: {schema: GenerateTailoredExplanationsOutputSchema},
  prompt: `You are an expert tutor, skilled at explaining complex topics to students with different levels of understanding.

  A student has asked the following query:
  {{query}}

  Their level of understanding is:
  {{userLevel}}

  Based on our prior interactions (if any):
  {{priorInteractions}}

  Generate an explanation that is tailored to their level of understanding. Focus on clarity and simplicity.
  Avoid jargon unless necessary, and if used, define the jargon.
  `,
});

const generateTailoredExplanationsFlow = ai.defineFlow(
  {
    name: 'generateTailoredExplanationsFlow',
    inputSchema: GenerateTailoredExplanationsInputSchema,
    outputSchema: GenerateTailoredExplanationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
