import { Request, Response, NextFunction } from 'express';
import { CampaignService } from '../services/campaign.service';
import { logger } from '../utils/logger';

export class CampaignController {
  /**
   * Endpoint to retrieve all campaigns.
   */
  public static getCampaigns = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      logger.info('Fetching campaigns list...');
      const campaigns = await CampaignService.getCampaigns();
      res.status(200).json(campaigns);
    } catch (error) {
      logger.error('Error fetching campaigns list:', error);
      next(error);
    }
  };

  /**
   * Endpoint to retrieve a single campaign by ID.
   */
  public static getCampaign = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      logger.info(`Fetching campaign details for id: ${id}...`);
      const campaign = await CampaignService.getCampaignById(id);

      if (!campaign) {
        logger.warn(`Campaign not found with id: ${id}`);
        res.status(404).json({ error: 'Campaign not found' });
        return;
      }

      res.status(200).json(campaign);
    } catch (error) {
      logger.error('Error fetching campaign details:', error);
      next(error);
    }
  };
}
