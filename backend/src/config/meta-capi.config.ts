import dotenv from 'dotenv';
dotenv.config();

export const metaCapiConfig = {
  pixelId: process.env.META_PIXEL_ID || '',
  accessToken: process.env.META_ACCESS_TOKEN || '',
  testEventCode: process.env.META_TEST_EVENT_CODE || '',
  apiVersion: process.env.META_API_VERSION || 'v19.0',
  apiUrl: 'https://graph.facebook.com',
};

// Validate that critical environment variables exist in production
export const validateConfig = (): void => {
  if (process.env.NODE_ENV === 'production') {
    if (!metaCapiConfig.pixelId) {
      throw new Error('META_PIXEL_ID is required in production environment.');
    }
    if (!metaCapiConfig.accessToken) {
      throw new Error('META_ACCESS_TOKEN is required in production environment.');
    }
  }
};
