import { Request, Response, NextFunction } from 'express';
import { MetaCapiEventRequest } from '../types/meta-capi.types';

/**
 * Validates incoming Conversion API tracking requests.
 * Ensures critical fields exist: eventName, eventSourceUrl, clientIpAddress, clientUserAgent.
 */
export const validateEventPayload = (
  req: Request<{}, {}, MetaCapiEventRequest>,
  res: Response,
  next: NextFunction
): void => {
  const { eventName, eventSourceUrl, clientIpAddress, clientUserAgent } = req.body;

  const errors: string[] = [];

  if (!eventName) {
    errors.push('Missing field: eventName');
  }

  if (!eventSourceUrl) {
    errors.push('Missing field: eventSourceUrl');
  }

  if (!clientIpAddress) {
    errors.push('Missing field: clientIpAddress');
  }

  if (!clientUserAgent) {
    errors.push('Missing field: clientUserAgent');
  }

  if (errors.length > 0) {
    res.status(400).json({
      success: false,
      message: 'Validation failed for CAPI event payload',
      errors,
    });
    return;
  }

  next();
};
