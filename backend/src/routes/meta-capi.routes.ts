import { Router } from 'express';
import { MetaCapiController } from '../controllers/meta-capi.controller';
import { validateEventPayload } from '../middleware/validation.middleware';

const router = Router();

/**
 * Route: POST /api/v1/meta-capi/track
 * Description: Processes and prepares a Meta CAPI event. Normalizes PII, validates payload structure.
 */
router.post('/track', validateEventPayload, MetaCapiController.trackEvent);

export const metaCapiRouter = router;
