'use server';

/**
 * @fileOverview An AI agent to analyze dental images and detect dental issues.
 *
 * - analyzeDentalImage - A function that analyzes a dental image and returns a diagnosis.
 * - AnalyzeDentalImageInput - The input type for the analyzeDentalImage function.
 * - AnalyzeDentalImageOutput - The return type for the analyzeDentalImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeDentalImageInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of teeth, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type AnalyzeDentalImageInput = z.infer<typeof AnalyzeDentalImageInputSchema>;

const AnalyzeDentalImageOutputSchema = z.object({
  diagnosis: z.string().describe('The diagnosis of the dental image, can be Gingivitis, Abscess, Cavity, Plaque, or Healthy.'),
  confidence: z.number().describe('The confidence score of the diagnosis.'),
  description: z.string().describe('A short description of the diagnosis.'),
});
export type AnalyzeDentalImageOutput = z.infer<typeof AnalyzeDentalImageOutputSchema>;

export async function analyzeDentalImage(
  input: AnalyzeDentalImageInput
): Promise<AnalyzeDentalImageOutput> {
  return analyzeDentalImageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeDentalImagePrompt',
  input: {schema: AnalyzeDentalImageInputSchema},
  output: {schema: AnalyzeDentalImageOutputSchema},
  prompt: `You are an expert dentist specializing in diagnosing dental issues from images.\n\nYou will use this information to diagnose the image, and any issues it has. Possible diagnoses are Gingivitis, Abscess, Cavity, Plaque, or Healthy.\n\nAnalyze the following image of teeth and provide a diagnosis, confidence score, and short description.\n\nPhoto: {{media url=photoDataUri}}`,
});

const analyzeDentalImageFlow = ai.defineFlow(
  {
    name: 'analyzeDentalImageFlow',
    inputSchema: AnalyzeDentalImageInputSchema,
    outputSchema: AnalyzeDentalImageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
