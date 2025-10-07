'use server';
/**
 * @fileOverview An AI agent for speech-to-text transcription.
 *
 * - liveDentalStt - A function that converts audio to text.
 * - LiveDentalSttInput - The input type for the liveDentalStt function.
 * - LiveDentalSttOutput - The return type for the liveDentalStt function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const LiveDentalSttInputSchema = z.object({
  audioDataUri: z
    .string()
    .describe(
      "A recording of speech, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type LiveDentalSttInput = z.infer<typeof LiveDentalSttInputSchema>;

const LiveDentalSttOutputSchema = z.object({
  text: z.string().describe('The transcribed text from the audio.'),
});
export type LiveDentalSttOutput = z.infer<typeof LiveDentalSttOutputSchema>;

export async function liveDentalStt(
  input: LiveDentalSttInput
): Promise<LiveDentalSttOutput> {
  return liveDentalSttFlow(input);
}

const liveDentalSttFlow = ai.defineFlow(
  {
    name: 'liveDentalSttFlow',
    inputSchema: LiveDentalSttInputSchema,
    outputSchema: LiveDentalSttOutputSchema,
  },
  async (input) => {
    const { text } = await ai.generate({
      prompt: [
        {
          media: {
            url: input.audioDataUri,
          },
        },
        { text: 'Transcribe the following audio.' },
      ],
    });
    return { text };
  }
);
