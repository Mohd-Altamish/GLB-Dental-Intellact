import { DashboardLayout } from '@/components/dashboard-layout';
import { DashboardNavItem } from '@/components/dashboard-nav-item';
import { Home, Users, Calendar } from 'lucide-react';

export default function DentistDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navItems = (
    <>
      <DashboardNavItem href="/dentist">
        <Users className="h-4 w-4" />
        My Patients
      </DashboardNavItem>
      <DashboardNavItem href="/dentist/appointments">
        <Calendar className="h-4 w-4" />
        Appointments
      </DashboardNavItem>
    </>
  );

  return (
    <DashboardLayout navItems={navItems} role="Dentist">
      {children}
    </DashboardLayout>
  );
}
