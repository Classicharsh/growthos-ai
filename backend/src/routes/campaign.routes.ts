import { Router } from 'express';
import { CampaignController } from '../controllers/campaign.controller';

const router = Router();

/**
 * Route: GET /api/v1/campaigns
 * Description: Retrieves all campaigns
 */
router.get('/', CampaignController.getCampaigns);

/**
 * Route: GET /api/v1/campaigns/:id
 * Description: Retrieves a single campaign by ID
 */
router.get('/:id', CampaignController.getCampaign);

export const campaignRouter = router;
