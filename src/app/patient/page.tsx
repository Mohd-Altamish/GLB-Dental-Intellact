import { ImageAnalysis } from '@/components/dashboard/patient/image-analysis';
import { AssessmentHistory } from '@/components/dashboard/patient/assessment-history';

export default function PatientDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight font-headline">Hello, Patient!</h2>
        <p className="text-muted-foreground">
          Upload an image of your teeth to get an AI-powered assessment.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <ImageAnalysis />
        </div>
        <div className="lg:col-span-2">
          <AssessmentHistory />
        </div>
      </div>
    </div>
  );
}
