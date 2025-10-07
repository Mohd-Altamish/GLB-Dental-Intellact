import { DashboardLayout } from '@/components/dashboard-layout';
import { DashboardNavItem } from '@/components/dashboard-nav-item';
import { Home, Calendar, BookOpen, Bot } from 'lucide-react';

export default function PatientDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navItems = (
    <>
      <DashboardNavItem href="/patient">
        <Home className="h-4 w-4" />
        Dashboard
      </DashboardNavItem>
      <DashboardNavItem href="/patient/live-diagnosis">
        <Bot className="h-4 w-4" />
        Live Diagnosis
      </DashboardNavItem>
      <DashboardNavItem href="/patient/appointments">
        <Calendar className="h-4 w-4" />
        Appointments
      </DashboardNavItem>
      <DashboardNavItem href="/patient/guides">
        <BookOpen className="h-4 w-4" />
        Health Guides
      </DashboardNavItem>
    </>
  );

  return (
    <DashboardLayout navItems={navItems} role="Patient">
      {children}
    </DashboardLayout>
  );
}
