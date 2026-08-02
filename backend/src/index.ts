import path from 'path';
import dotenv from 'dotenv';

// Load environment variables from the backend .env file first
dotenv.config();

// Load environment variables from the root .env.local file to share variables with Next.js
dotenv.config({ path: path.join(__dirname, '../../.env.local') });

import app from './app';
import { logger } from './utils/logger';

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
