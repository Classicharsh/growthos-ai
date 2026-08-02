import { metaCapiConfig, validateConfig } from '../config/meta-capi.config';
import { MetaCapiEvent, MetaCapiEventRequest, MetaUserData } from '../types/meta-capi.types';
import { hashSha256 } from '../utils/crypto';
import { logger } from '../utils/logger';

export class MetaCapiService {
  /**
   * Normalizes and hashes sensitive customer information properties.
   * Standard PII properties are lowercase/trimmed and SHA-256 hashed.
   * 
   * @param rawRequest Raw request input parameters
   * @returns Formatted MetaUserData payload
   */
  public static normalizeUserData(rawRequest: MetaCapiEventRequest): MetaUserData {
    const userData: MetaUserData = {};

    // Hash PII
    if (rawRequest.email) {
      userData.em = [hashSha256(rawRequest.email)!];
    }
    if (rawRequest.phone) {
      userData.ph = [hashSha256(rawRequest.phone)!];
    }
    if (rawRequest.firstName) {
      userData.fn = [hashSha256(rawRequest.firstName)!];
    }
    if (rawRequest.lastName) {
      userData.ln = [hashSha256(rawRequest.lastName)!];
    }

    // Set unhashed network/client identifiers
    if (rawRequest.clientIpAddress) {
      userData.client_ip_address = rawRequest.clientIpAddress;
    }
    if (rawRequest.clientUserAgent) {
      userData.client_user_agent = rawRequest.clientUserAgent;
    }
    if (rawRequest.fbc) {
      userData.fbc = rawRequest.fbc;
    }
    if (rawRequest.fbp) {
      userData.fbp = rawRequest.fbp;
    }

    return userData;
  }

  /**
   * Prepares the server event structure.
   */
  public static prepareEvent(request: MetaCapiEventRequest): MetaCapiEvent {
    const normalizedUserData = this.normalizeUserData(request);

    const event: MetaCapiEvent = {
      event_name: request.eventName,
      event_time: request.eventTime || Math.floor(Date.now() / 1000),
      event_id: request.eventId,
      event_source_url: request.eventSourceUrl,
      action_source: request.actionSource || 'website',
      user_data: normalizedUserData,
      custom_data: request.customData,
    };

    return event;
  }

  /**
   * Dispatches the event to the Meta Graph API.
   * 
   * @param request CAPI event request details
   * @returns Response metadata from Meta
   */
  public static async processEvent(request: MetaCapiEventRequest): Promise<{ success: boolean; data: any }> {
    // 1. Verify that critical environment configuration parameters exist
    validateConfig();

    logger.info(`Sending '${request.eventName}' event to Meta Graph API...`);

    // 2. Format event payload
    const preparedEvent = this.prepareEvent(request);

    // 3. Construct Meta Graph API payload
    const payload: { data: MetaCapiEvent[]; test_event_code?: string } = {
      data: [preparedEvent],
    };

    // If testEventCode is configured in environment, append it
    if (metaCapiConfig.testEventCode) {
      payload.test_event_code = metaCapiConfig.testEventCode;
      logger.info(`Adding test event code: ${metaCapiConfig.testEventCode}`);
    }

    const url = `${metaCapiConfig.apiUrl}/${metaCapiConfig.apiVersion}/${metaCapiConfig.pixelId}/events?access_token=${metaCapiConfig.accessToken}`;

    // 4. Dispatch active Graph API call via native Fetch
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const responseData = (await response.json()) as any;

      if (!response.ok) {
        logger.error('Meta Graph API request failed:', responseData);
        throw {
          status: response.status,
          message: responseData.error?.message || 'Meta CAPI API failed response.',
          details: responseData,
        };
      }

      logger.info(`Successfully sent '${request.eventName}' to Meta:`, responseData);
      return {
        success: true,
        data: responseData,
      };
    } catch (error: any) {
      logger.error('Outbound request network error:', error);
      throw error;
    }
  }
}
