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
 * Route: GET /api/v1/campaigns/:id
 * Description: Retrieves a single campaign by ID
 */
router.get('/:id', campaign_controller_1.CampaignController.getCampaign);
exports.campaignRouter = router;
