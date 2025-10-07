import { UserManagement } from "@/components/dashboard/admin/user-management";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight font-headline">User Management</h2>
        <p className="text-muted-foreground">
          View, manage, and edit user accounts across the platform.
        </p>
      </div>
      <UserManagement />
    </div>
  );
}
