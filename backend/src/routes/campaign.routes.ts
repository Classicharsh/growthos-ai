import { Router } from 'express';
import { CampaignController } from '../controllers/campaign.controller';

const router = Router();

/**
 * Route: GET /api/v1/campaigns
 * Description: Retrieves all campaigns
 */
router.get('/', CampaignController.getCampaigns);

/**
 * Route: GET /api/v1/campaigns/stats
 * Description: Retrieves aggregated campaign statistics
 */
router.get('/stats', CampaignController.getCampaignStats);

/**
 * Route: GET /api/v1/campaigns/:id
 * Description: Retrieves a single campaign by ID
 */
router.get('/:id', CampaignController.getCampaign);

/**
 * Route: POST /api/v1/campaigns
 * Description: Creates a new campaign
 */
router.post('/', CampaignController.createCampaign);

/**
 * Route: PUT /api/v1/campaigns/:id
 * Description: Updates an existing campaign details or status
 */
router.put('/:id', CampaignController.updateCampaign);

/**
 * Route: DELETE /api/v1/campaigns/:id
 * Description: Deletes a campaign by ID
 */
router.delete('/:id', CampaignController.deleteCampaign);

export const campaignRouter = router;
