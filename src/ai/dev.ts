import { config } from 'dotenv';
config();

import '@/ai/flows/ai-diagnosis-from-image.ts';
import '@/ai/flows/smart-conversation-summary.ts';
import '@/ai/flows/summarize-patient-doctor-conversation.ts';
import '@/ai/flows/analyze-dental-image.ts';
import '@/ai/flows/live-dental-diagnosis.ts';
import '@/ai/flows/live-dental-tts.ts';
import '@/ai/flows/live-dental-stt.ts';
import '@/ai/flows/patient-health-guide.ts';
