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

  /**
   * Endpoint to create a new campaign.
   */
  public static createCampaign = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      logger.info('Creating a new campaign...');
      const campaign = await CampaignService.createCampaign(req.body);
      res.status(201).json(campaign);
    } catch (error) {
      logger.error('Error creating campaign:', error);
      next(error);
    }
  };

  /**
   * Endpoint to update an existing campaign.
   */
  public static updateCampaign = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      logger.info(`Updating campaign with id: ${id}...`);
      const updatedCampaign = await CampaignService.updateCampaign(id, req.body);

      if (!updatedCampaign) {
        logger.warn(`Campaign not found for update with id: ${id}`);
        res.status(404).json({ error: 'Campaign not found' });
        return;
      }

      res.status(200).json(updatedCampaign);
    } catch (error) {
      logger.error('Error updating campaign:', error);
      next(error);
    }
  };

  /**
   * Endpoint to delete a campaign.
   */
  public static deleteCampaign = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      logger.info(`Deleting campaign with id: ${id}...`);
      const success = await CampaignService.deleteCampaign(id);

      if (!success) {
        logger.warn(`Campaign not found for deletion with id: ${id}`);
        res.status(404).json({ error: 'Campaign not found' });
        return;
      }

      res.status(200).json({ success: true, message: 'Campaign successfully deleted' });
    } catch (error) {
      logger.error('Error deleting campaign:', error);
      next(error);
    }
  };

  /**
   * Endpoint to retrieve campaign statistics.
   */
  public static getCampaignStats = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      logger.info('Fetching campaign statistics...');
      const stats = await CampaignService.getCampaignStats();
      res.status(200).json(stats);
    } catch (error) {
      logger.error('Error fetching campaign statistics:', error);
      next(error);
    }
  };
}
