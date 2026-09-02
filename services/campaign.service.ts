import { db } from '@/lib/firebase'
import { auth } from '@/lib/firebase'
import { collection, doc, getDoc, getDocs, addDoc, setDoc, updateDoc, deleteDoc, query, where, orderBy, serverTimestamp } from 'firebase/firestore'
import { Campaign, CampaignStatus } from '@/components/dashboard/campaigns/types'

/** Helper to get current user UID */
const getCurrentUserId = (): string => {
  if (!auth.currentUser) {
    throw new Error('User not authenticated')
  }
  return auth.currentUser.uid
}

/** Build Firestore collection reference for the current user */
const userCampaignsRef = () => collection(db, 'users', getCurrentUserId(), 'campaigns')

export const campaignService = {
  /** Retrieve campaigns with optional filters and client‑side search */
  getCampaigns: async (options?: { search?: string; status?: string; platform?: string }): Promise<Campaign[]> => {
    const colRef = userCampaignsRef()
    let q = query(colRef, orderBy('createdAt', 'desc'))
    if (options?.status) {
      q = query(q, where('status', '==', options.status))
    }
    if (options?.platform) {
      q = query(q, where('platform', '==', options.platform))
    }
    const snapshot = await getDocs(q)
    let campaigns = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Campaign))
    if (options?.search) {
      const term = options.search.toLowerCase()
      campaigns = campaigns.filter((c) => c.name?.toLowerCase().includes(term) || c.objective?.toLowerCase().includes(term))
    }
    return campaigns
  },

  /** Get a single campaign by ID */
  getCampaign: async (id: string): Promise<Campaign> => {
    const docRef = doc(db, 'users', getCurrentUserId(), 'campaigns', id)
    const snap = await getDoc(docRef)
    if (!snap.exists()) {
      throw new Error('Campaign not found')
    }
    return { id: snap.id, ...snap.data() } as Campaign
  },

  /** Create a new campaign */
  createCampaign: async (campaignData: Partial<Omit<Campaign, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Campaign> => {
    const colRef = userCampaignsRef()
    const docRef = await addDoc(colRef, {
      ...campaignData,
      // Ensure required numeric metrics have defaults
      spend: campaignData.spend ?? 0,
      ctr: campaignData.ctr ?? 0,
      cpc: campaignData.cpc ?? 0,
      roas: campaignData.roas ?? 0,
      status: campaignData.status ?? 'draft',
      impressions: 0,
      clicks: 0,
      conversions: 0,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })
    const snap = await getDoc(docRef)
    return { id: docRef.id, ...snap.data() } as Campaign
  },

  /** Update an existing campaign */
  updateCampaign: async (id: string, updateData: Partial<Campaign>): Promise<Campaign> => {
    const docRef = doc(db, 'users', getCurrentUserId(), 'campaigns', id)
    await updateDoc(docRef, { ...updateData, updatedAt: serverTimestamp() })
    const snap = await getDoc(docRef)
    return { id: snap.id, ...snap.data() } as Campaign
  },

  updateCampaignStatus: async (id: string, status: CampaignStatus): Promise<Campaign> => {
    return campaignService.updateCampaign(id, { status })
  },

  /** Delete a campaign */
  deleteCampaign: async (id: string): Promise<boolean> => {
    const docRef = doc(db, 'users', getCurrentUserId(), 'campaigns', id)
    await deleteDoc(docRef)
    return true
  },

  /** Compute dashboard statistics client‑side */
  getCampaignStats: async (): Promise<{ totalCampaigns: number; activeCampaigns: number; totalBudget: number; totalSpend: number; averageRoas: number }> => {
    const campaigns = await campaignService.getCampaigns()
    const totalCampaigns = campaigns.length
    const activeCampaigns = campaigns.filter((c) => c.status === 'Active').length
    const totalBudget = campaigns.reduce((sum, c) => sum + (c.budget || 0), 0)
    const totalSpend = campaigns.reduce((sum, c) => sum + (c.spend || 0), 0)
    const campaignsWithRoas = campaigns.filter((c) => c.roas && c.roas > 0)
    const averageRoas = campaignsWithRoas.length > 0 ? parseFloat((campaignsWithRoas.reduce((sum, c) => sum + c.roas, 0) / campaignsWithRoas.length).toFixed(2)) : 0
    return { totalCampaigns, activeCampaigns, totalBudget, totalSpend, averageRoas }
  },
}

