import crypto from 'crypto';

/**
 * Normalizes and hashes sensitive user data using SHA-256 to comply with Meta CAPI requirements.
 * Input value is trimmed and lowercased before hashing.
 * 
 * @param value Raw string value (e.g. Email, Phone, First Name)
 * @returns SHA-256 hashed lowercase string, or undefined if value is empty/invalid
 */
export const hashSha256 = (value?: string): string | undefined => {
  if (!value) return undefined;
  
  const normalized = value.trim().toLowerCase();
  
  // Do not re-hash if it's already a SHA-256 hash (64 characters hex)
  if (/^[a-f0-9]{64}$/i.test(normalized)) {
    return normalized;
  }
  
  return crypto.createHash('sha256').update(normalized).digest('hex');
};

/**
 * Hashes an array of strings.
 */
export const hashSha256Array = (values?: string[]): string[] | undefined => {
  if (!values || values.length === 0) return undefined;
  
  return values
    .map(val => hashSha256(val))
    .filter((val): val is string => !!val);
};
