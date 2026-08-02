import { DashboardOverview } from '../types/dashboard.types';

export class DashboardService {
  /**
   * Fetches mock analytics metrics for the dashboard overview.
   */
  public static async getOverviewMetrics(): Promise<DashboardOverview> {
    return {
      visitors: 124892,
      leads: 3104,
      conversionRate: 6.73,
      revenue: 89400,
      trafficSources: [
        {
          name: "Facebook",
          value: 45
        },
        {
          name: "Instagram",
          value: 35
        },
        {
          name: "Google",
          value: 20
        }
      ],
      recentEvents: [
        {
          id: "evt_18302",
          eventName: "Purchase",
          source: "Server CAPI",
          timestamp: "2 mins ago",
          status: "deduplicated",
          payloadSummary: "value: $128.00, currency: USD"
        },
        {
          id: "evt_18301",
          eventName: "PageView",
          source: "Browser Pixel",
          timestamp: "5 mins ago",
          status: "matched",
          payloadSummary: "url: /pricing, matches fbp: true"
        },
        {
          id: "evt_18299",
          eventName: "Lead",
          source: "Server CAPI",
          timestamp: "12 mins ago",
          status: "matched",
          payloadSummary: "email: hashed, zip: hashed"
        },
        {
          id: "evt_18295",
          eventName: "AddToCart",
          source: "Server CAPI",
          timestamp: "24 mins ago",
          status: "partial",
          payloadSummary: "fbc missing, standard match rate: 82%"
        }
      ],
      aiInsights: [
        {
          id: "ins_01",
          title: "Pixel-to-Server Deduplication Conflict",
          description: "Detected missing event_id parameters on 2.4% of client AddToCart triggers, causing duplicate records on Meta Ads Manager.",
          impact: "critical",
          impactText: "High Loss Risk",
          suggestion: "Apply eventId correlation helper to window.fbq call."
        },
        {
          id: "ins_02",
          title: "Enhance Match Rate Quality via FBP/FBC",
          description: "Server CAPI event matching rate can be optimized by 8.4% by mapping client browser cookies directly to the request payloads.",
          impact: "high",
          impactText: "ROAS Lift Potential",
          suggestion: "Enable automatic cookie harvesting middleware."
        },
        {
          id: "ins_03",
          title: "Safari Browser Signal Attenuation",
          description: "Due to Apple's standard ITP update policies, direct Pixel tracking on Safari shows a 14% drop. CAPI server redundancy is fully operational.",
          impact: "info",
          impactText: "System Insight",
          suggestion: "Review server routing redundancy configs."
        }
      ]
    };
  }
}
