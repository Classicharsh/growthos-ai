import { Request, Response, NextFunction } from 'express';
import { MetaCapiService } from '../services/meta-capi.service';
import { MetaCapiEventRequest } from '../types/meta-capi.types';
import { logger } from '../utils/logger';

export class MetaCapiController {
  /**
   * Endpoint to track server-side events.
   * Processes, normalizes, and logs the event data.
   */
  public static trackEvent = async (
    req: Request<{}, {}, MetaCapiEventRequest>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const eventRequest = req.body;
      
      logger.info(`Received trackEvent request for event: ${eventRequest.eventName}`);
      
      const result = await MetaCapiService.processEvent(eventRequest);
      
      res.status(200).json({
        success: true,
        message: `Event '${eventRequest.eventName}' processed successfully (Architecture execution only).`,
        data: result.event,
      });
    } catch (error) {
      logger.error('Error in MetaCapiController.trackEvent:', error);
      next(error);
    }
  };
}
