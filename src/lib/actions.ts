
'use server';

import { generateTailoredExplanations } from '@/ai/flows/generate-tailored-explanations';
import { guidedProblemSolving } from '@/ai/flows/guided-problem-solving';
import { provideInstantFeedback } from '@/ai/flows/instant-feedback';
import { z } from 'zod';

const explanationSchema = z.object({
  query: z.string().min(10, { message: 'Please enter a query of at least 10 characters.' }),
  userLevel: z.string(),
});

export type ExplanationState = {
  explanation?: string;
  error?: string;
};

export async function getExplanation(
  prevState: ExplanationState,
  formData: FormData
): Promise<ExplanationState> {
  const validatedFields = explanationSchema.safeParse({
    query: formData.get('query'),
    userLevel: formData.get('userLevel'),
  });

  if (!validatedFields.success) {
    return { error: validatedFields.error.flatten().fieldErrors.query?.join(', ') };
  }

  try {
    const result = await generateTailoredExplanations(validatedFields.data);
    return { explanation: result.explanation };
  } catch (error) {
    return { error: 'Failed to generate explanation. Please try again.' };
  }
}

const problemSolvingSchema = z.object({
  problem: z.string().min(10, { message: 'Please enter a problem of at least 10 characters.' }),
  studentLevel: z.string(),
  previousSteps: z.string().optional(),
});

export type ProblemSolvingState = {
  step?: string;
  explanation?: string;
  error?: string;
};

export async function getNextStep(
  prevState: ProblemSolvingState,
  formData: FormData
): Promise<ProblemSolvingState> {
  const validatedFields = problemSolvingSchema.safeParse({
    problem: formData.get('problem'),
    studentLevel: formData.get('studentLevel'),
    previousSteps: formData.get('previousSteps'),
  });

  if (!validatedFields.success) {
    const fieldErrors = validatedFields.error.flatten().fieldErrors;
    return { error: fieldErrors.problem?.join(', ') || fieldErrors.studentLevel?.join(', ') };
  }
  
  const previousSteps = validatedFields.data.previousSteps ? JSON.parse(validatedFields.data.previousSteps) : [];

  try {
    const result = await guidedProblemSolving({
      ...validatedFields.data,
      previousSteps,
    });
    return { step: result.step, explanation: result.explanation };
  } catch (error) {
    return { error: 'Failed to generate next step. Please try again.' };
  }
}

const feedbackSchema = z.object({
  question: z.string(),
  answer: z.string().min(1, { message: 'Please enter an answer.' }),
  expectedAnswer: z.string(),
  topic: z.string(),
});

export type FeedbackState = {
  feedback?: string;
  isCorrect?: boolean;
  hint?: string;
  error?: string;
};

export async function getFeedback(
  prevState: FeedbackState,
  formData: FormData
): Promise<FeedbackState> {
  const validatedFields = feedbackSchema.safeParse({
    question: formData.get('question'),
    answer: formData.get('answer'),
    expectedAnswer: formData.get('expectedAnswer'),
    topic: formData.get('topic'),
  });

  if (!validatedFields.success) {
    return { error: validatedFields.error.flatten().fieldErrors.answer?.join(', ') };
  }

  try {
    const result = await provideInstantFeedback(validatedFields.data);
    return result;
  } catch (error) {
    return { error: 'Failed to generate feedback. Please try again.' };
  }
}
