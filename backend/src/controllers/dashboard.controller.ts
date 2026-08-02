import { Request, Response, NextFunction } from 'express';
import { DashboardService } from '../services/dashboard.service';
import { logger } from '../utils/logger';

export class DashboardController {
  /**
   * Endpoint to retrieve dashboard metrics.
   */
  public static getOverview = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      logger.info('Fetching dashboard overview metrics...');
      
      const metrics = await DashboardService.getOverviewMetrics();
      
      res.status(200).json(metrics);
    } catch (error) {
      logger.error('Error fetching dashboard overview:', error);
      next(error);
    }
  };
}
