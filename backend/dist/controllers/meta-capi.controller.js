"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetaCapiController = void 0;
const meta_capi_service_1 = require("../services/meta-capi.service");
const logger_1 = require("../utils/logger");
class MetaCapiController {
}
exports.MetaCapiController = MetaCapiController;
_a = MetaCapiController;
/**
 * Endpoint to track server-side events.
 * Processes, normalizes, and sends the event data to Meta.
 */
MetaCapiController.trackEvent = async (req, res, next) => {
    try {
        const eventRequest = req.body;
        logger_1.logger.info(`Received tracking request for event: ${eventRequest.eventName}`);
        const result = await meta_capi_service_1.MetaCapiService.processEvent(eventRequest);
        res.status(200).json({
            success: true,
            message: `Event '${eventRequest.eventName}' sent to Meta successfully.`,
            data: result.data,
        });
    }
    catch (error) {
        logger_1.logger.error('Error in MetaCapiController.trackEvent:', error);
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
