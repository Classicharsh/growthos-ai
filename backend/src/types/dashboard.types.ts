export interface TrafficSource {
  name: string;
  value: number;
}

export interface DashboardOverview {
  visitors: number;
  leads: number;
  conversionRate: number;
  revenue: number;
  trafficSources: TrafficSource[];
  recentEvents: any[];
  aiInsights: any[];
}
