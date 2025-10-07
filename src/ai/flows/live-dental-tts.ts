'use server';
/**
 * @fileOverview An AI agent for text-to-speech generation.
 *
 * - liveDentalTts - A function that converts text to speech.
 * - LiveDentalTtsInput - The input type for the liveDentalTts function.
 * - LiveDentalTtsOutput - The return type for the liveDentalTts function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';
import wav from 'wav';

const LiveDentalTtsInputSchema = z.string();
export type LiveDentalTtsInput = z.infer<typeof LiveDentalTtsInputSchema>;

const LiveDentalTtsOutputSchema = z.object({
  media: z.string(),
});
export type LiveDentalTtsOutput = z.infer<typeof LiveDentalTtsOutputSchema>;

export async function liveDentalTts(
  input: LiveDentalTtsInput
): Promise<LiveDentalTtsOutput> {
  return liveDentalTtsFlow(input);
}

async function toWav(
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    let bufs = [] as any[];
    writer.on('error', reject);
    writer.on('data', function (d) {
      bufs.push(d);
    });
    writer.on('end', function () {
      resolve(Buffer.concat(bufs).toString('base64'));
    });

    writer.write(pcmData);
    writer.end();
  });
}

const liveDentalTtsFlow = ai.defineFlow(
  {
    name: 'liveDentalTtsFlow',
    inputSchema: LiveDentalTtsInputSchema,
    outputSchema: LiveDentalTtsOutputSchema,
  },
  async (query) => {
    const { media } = await ai.generate({
      model: googleAI.model('gemini-2.5-flash-preview-tts'),
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Algenib' },
          },
        },
      },
      prompt: query,
    });
    if (!media) {
      throw new Error('no media returned');
    }
    const audioBuffer = Buffer.from(
      media.url.substring(media.url.indexOf(',') + 1),
      'base64'
    );
    return {
      media: 'data:audio/wav;base64,' + (await toWav(audioBuffer)),
    };
  }
);
