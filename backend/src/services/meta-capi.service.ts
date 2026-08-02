import { metaCapiConfig } from '../config/meta-capi.config';
import { MetaCapiEvent, MetaCapiEventRequest, MetaUserData } from '../types/meta-capi.types';
import { hashSha256 } from '../utils/crypto';
import { logger } from '../utils/logger';

export class MetaCapiService {
  /**
   * Normalizes incoming user data properties to conform to Meta's hashing specifications.
   * Properties such as email, phone, first/last name, etc., are normalized and hashed with SHA-256.
   * Non-PII properties like IP Address, User Agent, and Browser/Click IDs (fbp/fbc) are retained unhashed.
   * 
   * @param rawUserData Raw user details from the client/application
   * @returns Normalized and hashed MetaUserData object
   */
  public static normalizeUserData(rawUserData: MetaCapiEventRequest['userData']): MetaUserData {
    const userData: MetaUserData = {};

    // 1. Map & Hash PII Properties
    if (rawUserData.email) {
      userData.em = [hashSha256(rawUserData.email)!];
    }
    if (rawUserData.phone) {
      userData.ph = [hashSha256(rawUserData.phone)!];
    }
    if (rawUserData.firstName) {
      userData.fn = [hashSha256(rawUserData.firstName)!];
    }
    if (rawUserData.lastName) {
      userData.ln = [hashSha256(rawUserData.lastName)!];
    }
    if (rawUserData.gender) {
      userData.ge = [hashSha256(rawUserData.gender)!];
    }
    if (rawUserData.dateOfBirth) {
      userData.db = [hashSha256(rawUserData.dateOfBirth)!];
    }
    if (rawUserData.city) {
      userData.ct = [hashSha256(rawUserData.city)!];
    }
    if (rawUserData.state) {
      userData.st = [hashSha256(rawUserData.state)!];
    }
    if (rawUserData.zip) {
      userData.zp = [hashSha256(rawUserData.zip)!];
    }
    if (rawUserData.country) {
      userData.country = [hashSha256(rawUserData.country)!];
    }

    // 2. Map Unhashed Properties (IP, User Agent, Click/Browser IDs)
    if (rawUserData.clientIpAddress) {
      userData.client_ip_address = rawUserData.clientIpAddress;
    }
    if (rawUserData.clientUserAgent) {
      userData.client_user_agent = rawUserData.clientUserAgent;
    }
    if (rawUserData.fbc) {
      userData.fbc = rawUserData.fbc;
    }
    if (rawUserData.fbp) {
      userData.fbp = rawUserData.fbp;
    }

    return userData;
  }

  /**
   * Prepares a standard CAPI event payload by validating configurations, 
   * normalizing the user data, and forming the final event object structure.
   * 
   * @param request The API request event payload details
   * @returns Formatted MetaCapiEvent payload ready to be sent
   */
  public static prepareEvent(request: MetaCapiEventRequest): MetaCapiEvent {
    const normalizedUserData = this.normalizeUserData(request.userData);

    const event: MetaCapiEvent = {
      event_name: request.eventName,
      event_time: request.eventTime || Math.floor(Date.now() / 1000),
      event_id: request.eventId,
      event_source_url: request.eventSourceUrl,
      action_source: request.actionSource,
      user_data: normalizedUserData,
      custom_data: request.customData,
    };

    return event;
  }

  /**
   * Reusable service method to process and queue/send events.
   * Core placeholder for dispatching events without making actual network requests.
   * 
   * @param request The event payload containing name, source, user data, and custom data
   */
  public static async processEvent(request: MetaCapiEventRequest): Promise<{ success: boolean; event: MetaCapiEvent }> {
    logger.info(`Processing event tracking request for: ${request.eventName}`);

    // Prepares the payload with full data normalization & hashing
    const preparedPayload = this.prepareEvent(request);

    // Architectural placeholder for the API Call (Do NOT call standard graph APIs or Axios yet)
    logger.info('Meta CAPI payload successfully constructed and normalized:', preparedPayload);
    logger.info(`[CAPI ARCHITECTURE PLACEHOLDER] Event '${request.eventName}' would be sent to Pixel ${metaCapiConfig.pixelId}`);

    return {
      success: true,
      event: preparedPayload,
    };
  }
}
