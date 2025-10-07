import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { reports } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Download, Filter } from 'lucide-react';
import { Report } from '@/lib/types';


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

export default function AdminReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight font-headline">All Reports</h2>
          <p className="text-muted-foreground">
            A comprehensive log of all assessments submitted on the platform.
          </p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
            <Button variant="outline" className="w-full sm:w-auto"><Filter /> Filter</Button>
            <Button className="w-full sm:w-auto"><Download /> Export as PDF</Button>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Assessment Log</CardTitle>
          <CardDescription>Browse all reports submitted by patients.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Diagnosis</TableHead>
                  <TableHead className="text-right">Confidence</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reports.map((report: Report) => (
                  <TableRow key={report.id}>
                    <TableCell className="font-medium">{report.patientName}</TableCell>
                    <TableCell>{report.date}</TableCell>
                    <TableCell>
                      <Badge variant={getBadgeVariant(report.diagnosis)}>{report.diagnosis}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {`${(report.confidence * 100).toFixed(0)}%`}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}