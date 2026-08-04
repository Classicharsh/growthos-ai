"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardRouter = void 0;
const express_1 = require("express");
const dashboard_controller_1 = require("../controllers/dashboard.controller");
const router = (0, express_1.Router)();
/**
 * Route: GET /api/v1/dashboard/overview
 * Description: Retrieves dashboard overview metrics
 */
router.get('/overview', dashboard_controller_1.DashboardController.getOverview);
exports.dashboardRouter = router;
