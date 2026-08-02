import { Request, Response, NextFunction } from 'express';
import { MetaCapiEventRequest } from '../types/meta-capi.types';

/**
 * Validates incoming Conversion API tracking requests.
 * Ensures critical fields like eventName, actionSource, and userData exist.
 */
export const validateEventPayload = (
  req: Request<{}, {}, MetaCapiEventRequest>,
  res: Response,
  next: NextFunction
): void => {
  const { eventName, actionSource, userData } = req.body;

  const errors: string[] = [];

  if (!eventName) {
    errors.push('Missing field: eventName');
  }

  const validActionSources = [
    'email', 'website', 'app', 'phone_call', 'chat', 'physical_store', 'system_generated', 'other'
  ];
  if (!actionSource) {
    errors.push('Missing field: actionSource');
  } else if (!validActionSources.includes(actionSource)) {
    errors.push(`Invalid actionSource. Must be one of: ${validActionSources.join(', ')}`);
  }

  if (!userData) {
    errors.push('Missing field: userData');
  } else {
    // Check for at least one piece of identifiable user data or fbp/fbc
    const identityFields = [
      'email', 'phone', 'firstName', 'lastName', 'gender', 'dateOfBirth', 'city', 'state', 'zip', 'country', 'fbc', 'fbp'
    ];
    const hasIdentityField = identityFields.some(field => !!(userData as any)[field]);
    if (!hasIdentityField) {
      errors.push('userData must contain at least one user identifier or browser cookie ID (email, phone, fbp, fbc, etc.)');
    }
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
