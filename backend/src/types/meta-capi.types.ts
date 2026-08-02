/**
 * Meta Conversion API User Data Parameter.
 * All PII (Personally Identifiable Information) must be SHA-256 hashed.
 * Reference: https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/user-data
 */
export interface MetaUserData {
  em?: string[]; // Email (hashed)
  ph?: string[]; // Phone (hashed)
  fn?: string[]; // First Name (hashed)
  ln?: string[]; // Last Name (hashed)
  ge?: string[]; // Gender (hashed)
  db?: string[]; // Date of Birth (hashed)
  ct?: string[]; // City (hashed)
  st?: string[]; // State (hashed)
  zp?: string[]; // Zip (hashed)
  country?: string[]; // Country (hashed)
  madid?: string[]; // Mobile advertiser ID (hashed)
  fnpt?: string[]; // Hashed external ID
  client_ip_address?: string; // Do not hash
  client_user_agent?: string; // Do not hash
  fbc?: string; // Click ID (fbc cookie value)
  fbp?: string; // Browser ID (fbp cookie value)
  subscription_id?: string; // Do not hash
  fb_login_id?: string; // Do not hash
  lead_id?: string; // Do not hash
}

/**
 * Meta Conversion API Custom Data Parameter.
 * Contains custom properties about the event (e.g. value, currency, content items).
 * Reference: https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/custom-data
 */
export interface MetaCustomData {
  currency?: string;
  value?: number;
  content_name?: string;
  content_category?: string;
  content_ids?: string[];
  content_type?: string;
  contents?: Array<{
    id: string;
    quantity: number;
    price?: number;
    item_price?: number;
    title?: string;
    category?: string;
  }>;
  num_items?: number;
  search_string?: string;
  status?: string;
  predicted_ltv?: number;
  order_id?: string;
  [key: string]: any; // Allow for other custom parameters
}

/**
 * Meta Conversion API Event payload object.
 * Reference: https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/server-event
 */
export interface MetaCapiEvent {
  event_name: string;
  event_time: number; // Unix timestamp in seconds
  event_id?: string; // For deduplication against browser Pixel events
  event_source_url?: string;
  action_source: 'email' | 'website' | 'app' | 'phone_call' | 'chat' | 'physical_store' | 'system_generated' | 'other';
  user_data: MetaUserData;
  custom_data?: MetaCustomData;
  opt_out?: boolean;
}

/**
 * Request payload structure expected by our controllers.
 */
export interface MetaCapiEventRequest {
  eventName: string;
  eventTime?: number;
  eventId?: string;
  eventSourceUrl?: string;
  actionSource: 'email' | 'website' | 'app' | 'phone_call' | 'chat' | 'physical_store' | 'system_generated' | 'other';
  userData: {
    email?: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
    gender?: string;
    dateOfBirth?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
    clientIpAddress?: string;
    clientUserAgent?: string;
    fbc?: string;
    fbp?: string;
  };
  customData?: MetaCustomData;
}
