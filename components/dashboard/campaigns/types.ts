export type CampaignStatus = "Active" | "Paused" | "Draft";

export interface Campaign {
  id: string;
  name: string;
  status: CampaignStatus;
  budget: number;
  spend: number;
  ctr: number;
  cpc: number;
  roas: number;
  createdAt: string;
}

export const dummyCampaigns: Campaign[] = [
  {
    id: "camp-01",
    name: "US - Lookalike Purchases 2%",
    status: "Active",
    budget: 5000,
    spend: 2450,
    ctr: 2.14,
    cpc: 0.85,
    roas: 4.8,
    createdAt: "2026-07-20",
  },
  {
    id: "camp-02",
    name: "EU - Retargeting Mid-Funnel",
    status: "Active",
    budget: 2500,
    spend: 1120,
    ctr: 1.82,
    cpc: 1.10,
    roas: 3.2,
    createdAt: "2026-07-18",
  },
  {
    id: "camp-03",
    name: "Global - Broad Conversion API",
    status: "Active",
    budget: 10000,
    spend: 4800,
    ctr: 2.48,
    cpc: 0.72,
    roas: 5.1,
    createdAt: "2026-07-25",
  },
  {
    id: "camp-04",
    name: "US/CA - AI Recommendations v4",
    status: "Active",
    budget: 4000,
    spend: 1890,
    ctr: 2.89,
    cpc: 0.65,
    roas: 6.2,
    createdAt: "2026-07-28",
  },
  {
    id: "camp-05",
    name: "LATAM - Interest Broad Reach",
    status: "Paused",
    budget: 1500,
    spend: 600,
    ctr: 1.12,
    cpc: 1.45,
    roas: 1.5,
    createdAt: "2026-06-15",
  },
  {
    id: "camp-06",
    name: "UK - Brand Awareness Reach",
    status: "Draft",
    budget: 1000,
    spend: 0,
    ctr: 0.00,
    cpc: 0.00,
    roas: 0.0,
    createdAt: "2026-08-01",
  },
  {
    id: "camp-07",
    name: "APAC - Dynamic Creative Optimization",
    status: "Active",
    budget: 8000,
    spend: 3400,
    ctr: 2.31,
    cpc: 0.92,
    roas: 4.1,
    createdAt: "2026-07-22",
  },
  {
    id: "camp-08",
    name: "US - Holiday Promotion Draft",
    status: "Draft",
    budget: 3000,
    spend: 0,
    ctr: 0.00,
    cpc: 0.00,
    roas: 0.0,
    createdAt: "2026-08-02",
  },
  {
    id: "camp-09",
    name: "CA - Retargeting Cart Abandoners",
    status: "Paused",
    budget: 2000,
    spend: 1950,
    ctr: 3.12,
    cpc: 0.58,
    roas: 7.4,
    createdAt: "2026-05-10",
  },
  {
    id: "camp-10",
    name: "MX - Search Query Scaling",
    status: "Active",
    budget: 3500,
    spend: 1750,
    ctr: 1.95,
    cpc: 0.88,
    roas: 3.8,
    createdAt: "2026-07-15",
  }
];
