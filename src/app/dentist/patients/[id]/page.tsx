import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AssessmentHistory } from '@/components/dashboard/patient/assessment-history';
import { Chat } from '@/components/dashboard/chat';
import { patients } from '@/lib/mock-data';

export default function PatientDetailPage({ params }: { params: { id: string } }) {
  const patient = patients.find(p => p.id === params.id) || patients[0];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <div className="lg:col-span-1 space-y-6">
        <Card>
            <CardHeader>
                <CardTitle>Patient Information</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center text-center">
                 <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src={patient.avatarUrl} alt={patient.name} />
                    <AvatarFallback>{patient.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-bold font-headline">{patient.name}</h3>
                <p className="text-muted-foreground">{patient.email}</p>
            </CardContent>
        </Card>
        <div className="block lg:hidden">
             <AssessmentHistory />
        </div>
      </div>
      <div className="lg:col-span-2 space-y-6">
        <Chat />
        <div className="hidden lg:block">
            <AssessmentHistory />
        </div>
      </div>
    </div>
  );
}
