'use server';

/**
 * @fileOverview An AI agent to generate patient health guides.
 *
 * - patientHealthGuide - A function that generates a health guide for a given topic.
 * - PatientHealthGuideInput - The input type for the patientHealthGuide function.
 * - PatientHealthGuideOutput - The return type for the patientHealthGuide function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PatientHealthGuideInputSchema = z.object({
  topic: z.string().describe('The dental health topic for which to generate a guide.'),
});
export type PatientHealthGuideInput = z.infer<typeof PatientHealthGuideInputSchema>;

const PatientHealthGuideOutputSchema = z.object({
  guide: z.string().describe('A helpful and informative guide on the specified topic, formatted with paragraphs separated by newlines.'),
});
export type PatientHealthGuideOutput = z.infer<typeof PatientHealthGuideOutputSchema>;

export async function patientHealthGuide(
  input: PatientHealthGuideInput
): Promise<PatientHealthGuideOutput> {
  return patientHealthGuideFlow(input);
}

const prompt = ai.definePrompt({
  name: 'patientHealthGuidePrompt',
  input: {schema: PatientHealthGuideInputSchema},
  output: {schema: PatientHealthGuideOutputSchema},
  prompt: `You are an expert dental hygienist.
  
  Generate a simple, clear, and helpful health guide for a patient on the following topic: {{{topic}}}.
  
  Provide practical tips and easy-to-understand explanations. Format the output as a few paragraphs, separated by newline characters.
  
  **IMPORTANT:** Always include a disclaimer at the end that this is general advice and the user should consult their dentist for personal medical concerns.`,
});

const patientHealthGuideFlow = ai.defineFlow(
  {
    name: 'patientHealthGuideFlow',
    inputSchema: PatientHealthGuideInputSchema,
    outputSchema: PatientHealthGuideOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
