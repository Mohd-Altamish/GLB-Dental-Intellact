// This file is machine-generated - edit at your own risk!

'use server';

/**
 * @fileOverview AI-powered diagnosis from a dental image.
 *
 * - aiDiagnosisFromImage - A function that accepts an image and returns a dental diagnosis.
 * - AIDiagnosisFromImageInput - The input type for the aiDiagnosisFromImage function.
 * - AIDiagnosisFromImageOutput - The return type for the aiDiagnosisFromImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIDiagnosisFromImageInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of teeth, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type AIDiagnosisFromImageInput = z.infer<typeof AIDiagnosisFromImageInputSchema>;

const AIDiagnosisFromImageOutputSchema = z.object({
  diagnosis: z.string().describe('The diagnosis of the dental image.'),
  confidence: z.number().describe('The confidence score of the diagnosis.'),
  description: z.string().describe('A short description of the diagnosis.'),
});
export type AIDiagnosisFromImageOutput = z.infer<typeof AIDiagnosisFromImageOutputSchema>;

export async function aiDiagnosisFromImage(
  input: AIDiagnosisFromImageInput
): Promise<AIDiagnosisFromImageOutput> {
  return aiDiagnosisFromImageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiDiagnosisFromImagePrompt',
  input: {schema: AIDiagnosisFromImageInputSchema},
  output: {schema: AIDiagnosisFromImageOutputSchema},
  prompt: `You are an expert dentist specializing in diagnosing dental issues from images.

You will use this information to diagnose the image, and any issues it has.

Analyze the following image of teeth and provide a diagnosis, confidence score, and short description.

Photo: {{media url=photoDataUri}}`,
});

const aiDiagnosisFromImageFlow = ai.defineFlow(
  {
    name: 'aiDiagnosisFromImageFlow',
    inputSchema: AIDiagnosisFromImageInputSchema,
    outputSchema: AIDiagnosisFromImageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
