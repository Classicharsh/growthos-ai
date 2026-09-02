"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const meta_capi_routes_1 = require("./routes/meta-capi.routes");
const dashboard_routes_1 = require("./routes/dashboard.routes");
// import { campaignRouter } from './routes/campaign.routes';
const error_middleware_1 = require("./middleware/error.middleware");
const app = (0, express_1.default)();
// Standard middleware
const corsOptions = {
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST', 'OPTIONS'],
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Routes placeholder
app.get('/', (req, res) => {
    res.status(200).json({
        status: 'online',
        message: 'GrowthOS AI Meta Conversion API Backend is running. Please use POST on /api/v1/meta-capi/track to send tracking events.'
    });
});
// Health endpoint
app.get('/health', (_req, res) => {
    res.status(200).json({ status: 'ok', service: 'growthos-ai-backend' });
});
app.use('/api/v1/meta-capi', meta_capi_routes_1.metaCapiRouter);
app.use('/api/v1/dashboard', dashboard_routes_1.dashboardRouter);
// app.use('/api/v1/campaigns', campaignRouter);
// Global Error Handler
app.use(error_middleware_1.errorHandler);
exports.default = app;
