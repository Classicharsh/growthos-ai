"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const logger_1 = require("../utils/logger");
/**
 * Global Express Error Handling Middleware.
 */
const errorHandler = (err, req, res, next) => {
    logger_1.logger.error('Unhandled request error:', err);
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';
    res.status(status).json({
        success: false,
        error: {
            message,
            status,
            ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
        },
    });
};
exports.errorHandler = errorHandler;
