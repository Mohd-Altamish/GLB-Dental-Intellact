import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { reports } from '@/lib/mock-data';
import { Badge } from '@/components/ui/badge';
import { FileText } from 'lucide-react';

export function AssessmentHistory() {
  const getBadgeVariant = (diagnosis: string) => {
    switch (diagnosis) {
      case 'Healthy':
        return 'default';
      case 'Gingivitis':
      case 'Plaque':
        return 'secondary';
      default:
        return 'destructive';
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Assessment History
        </CardTitle>
        <CardDescription>
          A log of your previous AI-powered assessments.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[380px]">
          <div className="space-y-4">
            {reports.map((report) => (
              <div key={report.id} className="flex items-start gap-4 p-2 rounded-lg hover:bg-muted/50">
                <Image
                  src={report.imageUrl}
                  alt={report.diagnosis}
                  width={80}
                  height={60}
                  data-ai-hint={report.imageHint}
                  className="aspect-video w-20 rounded-md object-cover"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-semibold">{report.diagnosis}</h4>
                     <Badge variant={getBadgeVariant(report.diagnosis)}>{report.diagnosis}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{report.date}</p>
                  <p className="text-sm mt-1 line-clamp-2">
                    {report.description}
                  </p>
                </div>
              </div>
            ))}
            {reports.length === 0 && (
                <div className="text-center text-muted-foreground py-10">
                    <p>No past assessments found.</p>
                </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
