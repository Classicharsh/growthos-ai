import * as React from "react";
import { dashboardService, DashboardOverviewData } from "../services/dashboard.service";

export function useDashboard() {
  const [data, setData] = React.useState<DashboardOverviewData | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  const fetchDashboard = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await dashboardService.getOverview();
      setData(response);
    } catch (err: any) {
      console.error("[useDashboard] Error loading metrics:", err);
      setError(err.response?.data?.error?.message || err.message || "Failed to load dashboard overview.");
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  const isEmpty = !data || (
    data.visitors === 0 &&
    data.leads === 0 &&
    data.revenue === 0 &&
    data.trafficSources.length === 0 &&
    data.recentEvents.length === 0
  );

  return {
    data,
    loading,
    error,
    isEmpty,
    refetch: fetchDashboard
  };
}
