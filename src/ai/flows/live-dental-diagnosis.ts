'use server';

/**
 * @fileOverview An AI agent for live dental diagnosis and conversation.
 *
 * - liveDentalDiagnosis - A function that handles the conversation and diagnosis.
 * - LiveDentalDiagnosisInput - The input type for the liveDentalDiagnosis function.
 * - LiveDentalDiagnosisOutput - The return type for the liveDentalDiagnosis function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const LiveDentalDiagnosisInputSchema = z.object({
  question: z.string().describe('The user\'s question or message.'),
  photoDataUri: z
    .string()
    .optional()
    .describe(
      "A photo of teeth, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type LiveDentalDiagnosisInput = z.infer<
  typeof LiveDentalDiagnosisInputSchema
>;

const LiveDentalDiagnosisOutputSchema = z.object({
  answer: z.string().describe('The AI assistant\'s response to the user.'),
});
export type LiveDentalDiagnosisOutput = z.infer<
  typeof LiveDentalDiagnosisOutputSchema
>;

export async function liveDentalDiagnosis(
  input: LiveDentalDiagnosisInput
): Promise<LiveDentalDiagnosisOutput> {
  return liveDentalDiagnosisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'liveDentalDiagnosisPrompt',
  input: { schema: LiveDentalDiagnosisInputSchema },
  output: { schema: LiveDentalDiagnosisOutputSchema },
  prompt: `You are a friendly and helpful AI dental assistant.
Your goal is to provide preliminary dental advice and analysis based on user descriptions and images.

**IMPORTANT:** You must always include a disclaimer that you are not a real doctor and the user should consult a professional dentist for any medical advice or diagnosis.

- If the user provides an image, analyze it for potential dental issues like cavities, gingivitis, plaque, or abscesses.
- If the user asks a question, provide a helpful and informative answer related to dental health.
- Keep your responses concise and easy to understand.

User's message: {{{question}}}
{{#if photoDataUri}}
User's uploaded photo: {{media url=photoDataUri}}
{{/if}}
`,
});

const liveDentalDiagnosisFlow = ai.defineFlow(
  {
    name: 'liveDentalDiagnosisFlow',
    inputSchema: LiveDentalDiagnosisInputSchema,
    outputSchema: LiveDentalDiagnosisOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
