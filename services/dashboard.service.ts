import axios from "axios";

export interface TrafficSource {
  name: string;
  value: number;
}

export interface CapiLogEvent {
  id: string;
  eventName: string;
  source: string;
  timestamp: string;
  status: "matched" | "deduplicated" | "partial";
  payloadSummary: string;
}

export interface InsightItem {
  id: string;
  title: string;
  description: string;
  impact: "critical" | "high" | "info";
  impactText: string;
  suggestion: string;
}

export interface DashboardOverviewData {
  visitors: number;
  leads: number;
  conversionRate: number;
  revenue: number;
  trafficSources: TrafficSource[];
  recentEvents: CapiLogEvent[];
  aiInsights: InsightItem[];
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api/v1";

export const dashboardService = {
  /**
   * Retrieves dashboard overview statistics from the Express backend API.
   */
  getOverview: async (): Promise<DashboardOverviewData> => {
    const response = await axios.get<DashboardOverviewData>(`${API_BASE_URL}/dashboard/overview`);
    return response.data;
  }
};
