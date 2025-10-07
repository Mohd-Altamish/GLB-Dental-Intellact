'use client';

import { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { patientHealthGuide } from '@/ai/flows/patient-health-guide';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

type GuideContent = {
  [key: string]: string | null;
};

export default function HealthGuidesPage() {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [guideContent, setGuideContent] = useState<GuideContent>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const topics = [
    { value: 'brushing-technique', title: 'Proper Brushing Technique' },
    { value: 'flossing-importance', title: 'The Importance of Flossing' },
    { value: 'healthy-diet', title: 'Diet for Healthy Teeth' },
    { value: 'gum-disease', title: 'Understanding Gum Disease' },
    { value: 'cavity-prevention', title: 'How to Prevent Cavities' },
    { value: 'sensitive-teeth', title: 'Managing Sensitive Teeth' },
  ];

  const handleAccordionChange = async (value: string) => {
    setActiveItem(value);
    if (!value || guideContent[value]) {
      // Collapse or already loaded
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const result = await patientHealthGuide({ topic: topics.find(t => t.value === value)?.title || '' });
      setGuideContent(prev => ({ ...prev, [value]: result.guide }));
    } catch (e) {
      console.error('Failed to generate health guide:', e);
      setError('Could not load the guide at this time. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight font-headline">Dental Health Guides</h2>
        <p className="text-muted-foreground">
          Personalized information and tips for maintaining excellent oral hygiene.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Hygiene Library</CardTitle>
          <CardDescription>Select a topic to get AI-powered advice.</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full" onValueChange={handleAccordionChange} value={activeItem || ''}>
            {topics.map(topic => (
              <AccordionItem value={topic.value} key={topic.value}>
                <AccordionTrigger>{topic.title}</AccordionTrigger>
                <AccordionContent>
                  {isLoading && activeItem === topic.value && (
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                  )}
                  {error && activeItem === topic.value && (
                     <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  {guideContent[topic.value] && (
                    <div className="prose prose-sm max-w-none dark:prose-invert">
                        {guideContent[topic.value]?.split('\n').map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
