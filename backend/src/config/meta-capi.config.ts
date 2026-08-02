import dotenv from 'dotenv';
dotenv.config();

export const metaCapiConfig = {
  // Read either META_PIXEL_ID or fallback to NEXT_PUBLIC_META_PIXEL_ID
  pixelId: process.env.META_PIXEL_ID || process.env.NEXT_PUBLIC_META_PIXEL_ID || '',
  accessToken: process.env.META_ACCESS_TOKEN || '',
  testEventCode: process.env.META_TEST_EVENT_CODE || '',
  apiVersion: process.env.META_API_VERSION || 'v19.0',
  apiUrl: 'https://graph.facebook.com',
};

/**
 * Validates that all critical credentials needed for Meta CAPI are defined.
 * Throws an descriptive error if anything is missing.
 */
export const validateConfig = (): void => {
  const missingVars: string[] = [];

  if (!metaCapiConfig.pixelId) {
    missingVars.push('META_PIXEL_ID / NEXT_PUBLIC_META_PIXEL_ID');
  }
  if (!metaCapiConfig.accessToken) {
    missingVars.push('META_ACCESS_TOKEN');
  }

  if (missingVars.length > 0) {
    throw new Error(
      `Meta CAPI configuration error. Missing required environment variables: ${missingVars.join(', ')}. ` +
      `Please define them in your environment or .env.local file.`
    );
  }
};
