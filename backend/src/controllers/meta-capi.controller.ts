import { Request, Response, NextFunction } from 'express';
import { MetaCapiService } from '../services/meta-capi.service';
import { MetaCapiEventRequest } from '../types/meta-capi.types';
import { logger } from '../utils/logger';

export class MetaCapiController {
  /**
   * Endpoint to track server-side events.
   * Processes, normalizes, and sends the event data to Meta.
   */
  public static trackEvent = async (
    req: Request<{}, {}, MetaCapiEventRequest>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const eventRequest = req.body;
      
      logger.info(`Received tracking request for event: ${eventRequest.eventName}`);
      
      const result = await MetaCapiService.processEvent(eventRequest);
      
      res.status(200).json({
        success: true,
        message: `Event '${eventRequest.eventName}' sent to Meta successfully.`,
        data: result.data,
      });
    } catch (error: any) {
      logger.error('Error in MetaCapiController.trackEvent:', error);
      
      // Send API validation errors back to the caller
      const status = error.status || 500;
      const message = error.message || 'Failed to dispatch Meta CAPI event.';
      const details = error.details || null;
      
      res.status(status).json({
        success: false,
        error: {
          message,
          status,
          ...(details && { details }),
        },
      });
    }
  };
}
