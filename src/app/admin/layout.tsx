import { DashboardLayout } from '@/components/dashboard-layout';
import { DashboardNavItem } from '@/components/dashboard-nav-item';
import { Users, FileText, LineChart } from 'lucide-react';

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navItems = (
    <>
      <DashboardNavItem href="/admin">
        <Users className="h-4 w-4" />
        User Management
      </DashboardNavItem>
      <DashboardNavItem href="/admin/reports">
        <FileText className="h-4 w-4" />
        All Reports
      </DashboardNavItem>
      <DashboardNavItem href="/admin/analytics">
        <LineChart className="h-4 w-4" />
        Analytics
      </DashboardNavItem>
    </>
  );

  return (
    <DashboardLayout navItems={navItems} role="Admin">
      {children}
    </DashboardLayout>
  );
}
