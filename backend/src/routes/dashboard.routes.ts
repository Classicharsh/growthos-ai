import { Router } from 'express';
import { DashboardController } from '../controllers/dashboard.controller';

const router = Router();

/**
 * Route: GET /api/v1/dashboard/overview
 * Description: Retrieves dashboard overview metrics
 */
router.get('/overview', DashboardController.getOverview);

export const dashboardRouter = router;
