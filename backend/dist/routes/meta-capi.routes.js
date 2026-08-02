"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.metaCapiRouter = void 0;
const express_1 = require("express");
const meta_capi_controller_1 = require("../controllers/meta-capi.controller");
const validation_middleware_1 = require("../middleware/validation.middleware");
const router = (0, express_1.Router)();
/**
 * Route: POST /api/v1/meta-capi/track
 * Description: Processes and prepares a Meta CAPI event. Normalizes PII, validates payload structure.
 */
router.post('/track', validation_middleware_1.validateEventPayload, meta_capi_controller_1.MetaCapiController.trackEvent);
exports.metaCapiRouter = router;
