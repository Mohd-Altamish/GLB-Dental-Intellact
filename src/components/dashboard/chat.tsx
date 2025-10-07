'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { chatHistory } from '@/lib/mock-data';
import { Sparkles, Bot, Send, Loader2 } from 'lucide-react';
import { summarizeConversation } from '@/ai/flows/smart-conversation-summary';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '../ui/skeleton';

export function Chat() {
  const [messages, setMessages] = useState(chatHistory);
  const [newMessage, setNewMessage] = useState('');
  const [summary, setSummary] = useState('');
  const [isSummarizing, setIsSummarizing] = useState(false);
  const { toast } = useToast();

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
          id: `msg${messages.length + 1}`,
          sender: 'dentist', // Assuming dentist is replying
          text: newMessage,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      setNewMessage('');
    }
  };

  const handleSummarize = async () => {
    setIsSummarizing(true);
    setSummary('');
    try {
      const conversationText = messages.map(m => `${m.sender}: ${m.text}`).join('\n');
      const result = await summarizeConversation({ conversationHistory: conversationText });
      setSummary(result.summary);
    } catch (error) {
      console.error('Summarization failed:', error);
      toast({
        variant: 'destructive',
        title: 'Summarization Failed',
        description: 'Could not generate summary. Please try again.',
      });
    } finally {
      setIsSummarizing(false);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Patient Chat</CardTitle>
          <CardDescription>Communicate with the patient directly.</CardDescription>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" onClick={handleSummarize}>
              <Sparkles />
              Smart Summary
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Bot className="h-6 w-6 text-primary" />
                Conversation Summary
              </DialogTitle>
              <DialogDescription>
                An AI-generated summary of your conversation with the patient.
              </DialogDescription>
            </DialogHeader>
            <div className="prose prose-sm max-w-none">
              {isSummarizing && (
                <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                </div>
              )}
              {summary && <p>{summary}</p>}
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-64 pr-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  'flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm',
                  message.sender === 'patient'
                    ? 'ml-auto bg-primary text-primary-foreground'
                    : 'bg-muted'
                )}
              >
                {message.text}
                <span className={cn("text-xs self-end", message.sender === 'patient' ? 'text-primary-foreground/80' : 'text-muted-foreground/80')}>{message.timestamp}</span>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <form onSubmit={handleSendMessage} className="flex w-full items-center space-x-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
          />
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
