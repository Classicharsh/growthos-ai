export type CampaignStatus = 'Active' | 'Paused' | 'Draft';

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
