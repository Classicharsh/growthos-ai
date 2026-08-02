import express, { Express } from 'express';
import cors from 'cors';
import { metaCapiRouter } from './routes/meta-capi.routes';
import { errorHandler } from './middleware/error.middleware';

const app: Express = express();

// Standard middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes placeholder
app.use('/api/v1/meta-capi', metaCapiRouter);

// Global Error Handler
app.use(errorHandler);

export default app;
