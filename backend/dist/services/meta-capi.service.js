"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetaCapiService = void 0;
const meta_capi_config_1 = require("../config/meta-capi.config");
const crypto_1 = require("../utils/crypto");
const logger_1 = require("../utils/logger");
class MetaCapiService {
    /**
     * Normalizes and hashes sensitive customer information properties.
     * Standard PII properties are lowercase/trimmed and SHA-256 hashed.
     *
     * @param rawRequest Raw request input parameters
     * @returns Formatted MetaUserData payload
     */
    static normalizeUserData(rawRequest) {
        const userData = {};
        // Hash PII
        if (rawRequest.email) {
            userData.em = [(0, crypto_1.hashSha256)(rawRequest.email)];
        }
        if (rawRequest.phone) {
            userData.ph = [(0, crypto_1.hashSha256)(rawRequest.phone)];
        }
        if (rawRequest.firstName) {
            userData.fn = [(0, crypto_1.hashSha256)(rawRequest.firstName)];
        }
        if (rawRequest.lastName) {
            userData.ln = [(0, crypto_1.hashSha256)(rawRequest.lastName)];
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
    static prepareEvent(request) {
        const normalizedUserData = this.normalizeUserData(request);
        const event = {
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
    static async processEvent(request) {
        // 1. Verify that critical environment configuration parameters exist
        (0, meta_capi_config_1.validateConfig)();
        logger_1.logger.info(`Sending '${request.eventName}' event to Meta Graph API...`);
        // 2. Format event payload
        const preparedEvent = this.prepareEvent(request);
        // 3. Construct Meta Graph API payload
        const payload = {
            data: [preparedEvent],
        };
        // If testEventCode is configured in environment, append it
        if (meta_capi_config_1.metaCapiConfig.testEventCode) {
            payload.test_event_code = meta_capi_config_1.metaCapiConfig.testEventCode;
            logger_1.logger.info(`Adding test event code: ${meta_capi_config_1.metaCapiConfig.testEventCode}`);
        }
        const url = `${meta_capi_config_1.metaCapiConfig.apiUrl}/${meta_capi_config_1.metaCapiConfig.apiVersion}/${meta_capi_config_1.metaCapiConfig.pixelId}/events?access_token=${meta_capi_config_1.metaCapiConfig.accessToken}`;
        // 4. Dispatch active Graph API call via native Fetch
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
            const responseData = (await response.json());
            if (!response.ok) {
                logger_1.logger.error('Meta Graph API request failed:', responseData);
                throw {
                    status: response.status,
                    message: responseData.error?.message || 'Meta CAPI API failed response.',
                    details: responseData,
                };
            }
            logger_1.logger.info(`Successfully sent '${request.eventName}' to Meta:`, responseData);
            return {
                success: true,
                data: responseData,
            };
        }
        catch (error) {
            logger_1.logger.error('Outbound request network error:', error);
            throw error;
        }
    }
}
exports.MetaCapiService = MetaCapiService;
