import { Campaign } from "@/components/dashboard/campaigns/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api/v1";

export const campaignService = {
  /**
   * Retrieves all campaigns from the Express backend API.
   * Uses fetch() with async/await.
   */
  getCampaigns: async (): Promise<Campaign[]> => {
    const url = `${API_BASE_URL}/campaigns`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch campaigns. Server responded with status: ${response.status}`);
    }

    const data = await response.json();
    return data as Campaign[];
  },

  /**
   * Retrieves a single campaign by ID from the Express backend API.
   * Uses fetch() with async/await.
   */
  getCampaign: async (id: string): Promise<Campaign> => {
    const url = `${API_BASE_URL}/campaigns/${encodeURIComponent(id)}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch campaign details for ID: ${id}. Server responded with status: ${response.status}`);
    }

    const data = await response.json();
    return data as Campaign;
  },

  /**
   * Creates a new campaign.
   */
  createCampaign: async (campaignData: Omit<Campaign, 'id' | 'spend' | 'ctr' | 'cpc' | 'roas' | 'createdAt'>): Promise<Campaign> => {
    const url = `${API_BASE_URL}/campaigns`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(campaignData),
    });

    if (!response.ok) {
      throw new Error(`Failed to create campaign. Server responded with status: ${response.status}`);
    }

    const data = await response.json();
    return data as Campaign;
  },

  /**
   * Updates an existing campaign.
   */
  updateCampaign: async (id: string, updateData: Partial<Campaign>): Promise<Campaign> => {
    const url = `${API_BASE_URL}/campaigns/${encodeURIComponent(id)}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(updateData),
    });

    if (!response.ok) {
      throw new Error(`Failed to update campaign ${id}. Server responded with status: ${response.status}`);
    }

    const data = await response.json();
    return data as Campaign;
  },

  /**
   * Deletes a campaign.
   */
  deleteCampaign: async (id: string): Promise<boolean> => {
    const url = `${API_BASE_URL}/campaigns/${encodeURIComponent(id)}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to delete campaign ${id}. Server responded with status: ${response.status}`);
    }

    const data = await response.json();
    return data.success;
  },

  /**
   * Retrieves campaign stats.
   */
  getCampaignStats: async (): Promise<{
    totalCampaigns: number;
    activeCampaigns: number;
    totalSpend: number;
    averageRoas: number;
  }> => {
    const url = `${API_BASE_URL}/campaigns/stats`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch campaign stats. Server responded with status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  },
};
