"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardController = void 0;
const dashboard_service_1 = require("../services/dashboard.service");
const logger_1 = require("../utils/logger");
class DashboardController {
}
exports.DashboardController = DashboardController;
_a = DashboardController;
/**
 * Endpoint to retrieve dashboard metrics.
 */
DashboardController.getOverview = async (req, res, next) => {
    try {
        logger_1.logger.info('Fetching dashboard overview metrics...');
        const metrics = await dashboard_service_1.DashboardService.getOverviewMetrics();
        res.status(200).json(metrics);
    }
    catch (error) {
        logger_1.logger.error('Error fetching dashboard overview:', error);
        next(error);
    }
};
