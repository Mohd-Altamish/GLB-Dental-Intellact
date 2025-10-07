'use server';

/**
 * @fileOverview An AI agent for summarizing patient-dentist conversations.
 *
 * - summarizePatientDoctorConversation - A function that summarizes conversation history.
 * - SummarizePatientDoctorConversationInput - The input type for the summarizePatientDoctorConversation function.
 * - SummarizePatientDoctorConversationOutput - The return type for the summarizePatientDoctorConversation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizePatientDoctorConversationInputSchema = z.object({
  conversationHistory: z
    .string()
    .describe('The full conversation history between the dentist and patient.'),
});
export type SummarizePatientDoctorConversationInput = z.infer<typeof SummarizePatientDoctorConversationInputSchema>;

const SummarizePatientDoctorConversationOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the conversation.'),
});
export type SummarizePatientDoctorConversationOutput = z.infer<typeof SummarizePatientDoctorConversationOutputSchema>;

export async function summarizePatientDoctorConversation(
  input: SummarizePatientDoctorConversationInput
): Promise<SummarizePatientDoctorConversationOutput> {
  return summarizePatientDoctorConversationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizePatientDoctorConversationPrompt',
  input: {schema: SummarizePatientDoctorConversationInputSchema},
  output: {schema: SummarizePatientDoctorConversationOutputSchema},
  prompt: `You are an AI assistant helping dentists quickly review patient conversations.\n  Summarize the following conversation, extracting the key points and relevant details for the dentist.\n  Conversation History: {{{conversationHistory}}}`,
});

const summarizePatientDoctorConversationFlow = ai.defineFlow(
  {
    name: 'summarizePatientDoctorConversationFlow',
    inputSchema: SummarizePatientDoctorConversationInputSchema,
    outputSchema: SummarizePatientDoctorConversationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
