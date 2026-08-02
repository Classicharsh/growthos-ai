"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEventPayload = void 0;
/**
 * Validates incoming Conversion API tracking requests.
 * Ensures critical fields exist: eventName, eventSourceUrl, clientIpAddress, clientUserAgent.
 */
const validateEventPayload = (req, res, next) => {
    const { eventName, eventSourceUrl, clientIpAddress, clientUserAgent } = req.body;
    const errors = [];
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
exports.validateEventPayload = validateEventPayload;
