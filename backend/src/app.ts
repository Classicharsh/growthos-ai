import express, { Express } from 'express';
import cors from 'cors';
import { metaCapiRouter } from './routes/meta-capi.routes';
import { dashboardRouter } from './routes/dashboard.routes';
import { campaignRouter } from './routes/campaign.routes';
import { errorHandler } from './middleware/error.middleware';

const app: Express = express();

// Standard middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes placeholder
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'online',
    message: 'GrowthOS AI Meta Conversion API Backend is running. Please use POST on /api/v1/meta-capi/track to send tracking events.'
  });
});

app.use('/api/v1/meta-capi', metaCapiRouter);
app.use('/api/v1/dashboard', dashboardRouter);
app.use('/api/v1/campaigns', campaignRouter);

// Global Error Handler
app.use(errorHandler);

export default app;
