"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.campaignRouter = void 0;
const express_1 = require("express");
const campaign_controller_1 = require("../controllers/campaign.controller");
const router = (0, express_1.Router)();
/**
 * Route: GET /api/v1/campaigns
 * Description: Retrieves all campaigns
 */
router.get('/', campaign_controller_1.CampaignController.getCampaigns);
/**
 * Route: GET /api/v1/campaigns/stats
 * Description: Retrieves aggregated campaign statistics
 */
router.get('/stats', campaign_controller_1.CampaignController.getCampaignStats);
/**
 * Route: GET /api/v1/campaigns/:id
 * Description: Retrieves a single campaign by ID
 */
router.get('/:id', campaign_controller_1.CampaignController.getCampaign);
/**
 * Route: POST /api/v1/campaigns
 * Description: Creates a new campaign
 */
router.post('/', campaign_controller_1.CampaignController.createCampaign);
/**
 * Route: PUT /api/v1/campaigns/:id
 * Description: Updates an existing campaign details or status
 */
router.put('/:id', campaign_controller_1.CampaignController.updateCampaign);
/**
 * Route: DELETE /api/v1/campaigns/:id
 * Description: Deletes a campaign by ID
 */
router.delete('/:id', campaign_controller_1.CampaignController.deleteCampaign);
exports.campaignRouter = router;
