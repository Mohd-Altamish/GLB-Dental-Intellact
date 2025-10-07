'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Line, LineChart, ResponsiveContainer, Pie, PieChart, Cell } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import { reports, patients, dentists, appointments } from '@/lib/mock-data';
import { Users, FileText, Stethoscope, Calendar } from 'lucide-react';

const diseaseData = reports.reduce((acc, report) => {
  const existing = acc.find(item => item.name === report.diagnosis);
  if (existing) {
    existing.value += 1;
  } else {
    acc.push({ name: report.diagnosis, value: 1 });
  }
  return acc;
}, [] as { name: string, value: number }[]);

const appointmentStatusData = appointments.reduce((acc, appointment) => {
    const existing = acc.find(item => item.name === appointment.status);
    if (existing) {
        existing.value += 1;
    } else {
        acc.push({ name: appointment.status, value: 1 });
    }
    return acc;
}, [] as { name: string, value: number }[]);


const activityData = [
    { date: 'Jan', users: 12, reports: 20 },
    { date: 'Feb', users: 19, reports: 35 },
    { date: 'Mar', users: 25, reports: 45 },
    { date: 'Apr', users: 32, reports: 60 },
    { date: 'May', users: 45, reports: 80 },
    { date: 'Jun', users: 50, reports: 95 },
];

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];

export function AnalyticsDashboard() {
  return (
    <div className="grid gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{patients.length}</div>
                <p className="text-xs text-muted-foreground">+5 since last month</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Dentists</CardTitle>
                <Stethoscope className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{dentists.length}</div>
                <p className="text-xs text-muted-foreground">+1 since last month</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{reports.length}</div>
                <p className="text-xs text-muted-foreground">+20.1% from last month</p>
            </CardContent>
        </Card>
         <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Appointments</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{appointments.length}</div>
                <p className="text-xs text-muted-foreground">+10 since last month</p>
            </CardContent>
        </Card>
        
        <Card className="sm:col-span-2 lg:col-span-4">
            <CardHeader>
                <CardTitle>Platform Activity</CardTitle>
                <CardDescription>Users and reports over the last 6 months.</CardDescription>
            </CardHeader>
            <CardContent>
                 <ChartContainer config={{}} className="h-[250px] w-full">
                    <LineChart data={activityData}>
                        <CartesianGrid vertical={false} />
                        <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line type="monotone" dataKey="reports" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} name="Reports" />
                        <Line type="monotone" dataKey="users" stroke="hsl(var(--accent))" strokeWidth={2} dot={false} name="Users" />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
        
        <Card className="sm:col-span-2">
            <CardHeader>
                <CardTitle>Disease Distribution</CardTitle>
                <CardDescription>A breakdown of all diagnoses.</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={{
                    value: { label: 'Diagnoses' },
                    Gingivitis: { label: 'Gingivitis', color: 'hsl(var(--chart-2))' },
                    Cavity: { label: 'Cavity', color: 'hsl(var(--chart-3))' },
                    Healthy: { label: 'Healthy', color: 'hsl(var(--chart-1))' },
                    Plaque: { label: 'Plaque', color: 'hsl(var(--chart-4))' },
                    Abscess: { label: 'Abscess', color: 'hsl(var(--chart-5))' },
                }} className="h-[250px] w-full">
                    <PieChart>
                         <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                        <Pie data={diseaseData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="hsl(var(--primary))" label>
                            {diseaseData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <ChartLegend content={<ChartLegendContent />} />
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>

        <Card className="sm:col-span-2">
            <CardHeader>
                <CardTitle>Appointment Status</CardTitle>
                <CardDescription>A breakdown of appointment statuses.</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={{
                    value: { label: 'Appointments' },
                    Confirmed: { label: 'Confirmed', color: 'hsl(var(--chart-1))' },
                    Pending: { label: 'Pending', color: 'hsl(var(--chart-4))' },
                    Cancelled: { label: 'Cancelled', color: 'hsl(var(--chart-3))' },
                }} className="h-[250px] w-full">
                    <PieChart>
                         <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                        <Pie data={appointmentStatusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="hsl(var(--primary))" label>
                            {appointmentStatusData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <ChartLegend content={<ChartLegendContent />} />
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>

    </div>
  );
}
