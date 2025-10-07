import { AnalyticsDashboard } from "@/components/dashboard/admin/analytics-dashboard";

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight font-headline">Analytics</h2>
        <p className="text-muted-foreground">
          An overview of platform usage and health trends.
        </p>
      </div>
      <AnalyticsDashboard />
    </div>
  );
}
