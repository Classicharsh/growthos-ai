"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampaignService = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const DATA_FILE = path.join(__dirname, '../../data/campaigns.json');
const initialMockCampaigns = [
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
function readCampaignsFromFile() {
    try {
        const dir = path.dirname(DATA_FILE);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        if (!fs.existsSync(DATA_FILE)) {
            fs.writeFileSync(DATA_FILE, JSON.stringify(initialMockCampaigns, null, 2), 'utf-8');
            return initialMockCampaigns;
        }
        const content = fs.readFileSync(DATA_FILE, 'utf-8');
        return JSON.parse(content);
    }
    catch (error) {
        console.error('Error reading campaigns file:', error);
        return initialMockCampaigns;
    }
}
function writeCampaignsToFile(campaigns) {
    try {
        const dir = path.dirname(DATA_FILE);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(DATA_FILE, JSON.stringify(campaigns, null, 2), 'utf-8');
    }
    catch (error) {
        console.error('Error writing campaigns file:', error);
    }
}
class CampaignService {
    /**
     * Fetches all campaigns.
     */
    static async getCampaigns() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(readCampaignsFromFile());
            }, 50);
        });
    }
    /**
     * Fetches a campaign by its unique ID.
     */
    static async getCampaignById(id) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const campaigns = readCampaignsFromFile();
                const campaign = campaigns.find((c) => c.id === id);
                resolve(campaign || null);
            }, 30);
        });
    }
    /**
     * Creates a new campaign.
     */
    static async createCampaign(campaignData) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const campaigns = readCampaignsFromFile();
                const newCampaign = {
                    ...campaignData,
                    id: `camp-${Math.random().toString(36).substr(2, 9)}`,
                    spend: 0,
                    ctr: 0,
                    cpc: 0,
                    roas: 0,
                    createdAt: new Date().toISOString().split('T')[0],
                };
                campaigns.push(newCampaign);
                writeCampaignsToFile(campaigns);
                resolve(newCampaign);
            }, 50);
        });
    }
    /**
     * Updates an existing campaign.
     */
    static async updateCampaign(id, updateData) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const campaigns = readCampaignsFromFile();
                const index = campaigns.findIndex((c) => c.id === id);
                if (index === -1) {
                    resolve(null);
                    return;
                }
                campaigns[index] = {
                    ...campaigns[index],
                    ...updateData,
                    id, // protect id integrity
                };
                writeCampaignsToFile(campaigns);
                resolve(campaigns[index]);
            }, 50);
        });
    }
    /**
     * Deletes a campaign.
     */
    static async deleteCampaign(id) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const campaigns = readCampaignsFromFile();
                const index = campaigns.findIndex((c) => c.id === id);
                if (index === -1) {
                    resolve(false);
                    return;
                }
                campaigns.splice(index, 1);
                writeCampaignsToFile(campaigns);
                resolve(true);
            }, 50);
        });
    }
    /**
     * Calculates aggregated campaign statistics.
     */
    static async getCampaignStats() {
        return new Promise((resolve) => {
            setTimeout(() => {
                const campaigns = readCampaignsFromFile();
                const totalCampaigns = campaigns.length;
                const activeCampaigns = campaigns.filter((c) => c.status === 'Active').length;
                const totalSpend = campaigns.reduce((sum, c) => sum + c.spend, 0);
                const campaignsWithRoas = campaigns.filter((c) => c.roas > 0);
                const averageRoas = campaignsWithRoas.length > 0
                    ? parseFloat((campaignsWithRoas.reduce((sum, c) => sum + c.roas, 0) / campaignsWithRoas.length).toFixed(2))
                    : 0;
                resolve({
                    totalCampaigns,
                    activeCampaigns,
                    totalSpend,
                    averageRoas,
                });
            }, 50);
        });
    }
}
exports.CampaignService = CampaignService;
