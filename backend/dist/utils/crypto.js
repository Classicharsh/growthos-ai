"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashSha256Array = exports.hashSha256 = void 0;
const crypto_1 = __importDefault(require("crypto"));
/**
 * Normalizes and hashes sensitive user data using SHA-256 to comply with Meta CAPI requirements.
 * Input value is trimmed and lowercased before hashing.
 *
 * @param value Raw string value (e.g. Email, Phone, First Name)
 * @returns SHA-256 hashed lowercase string, or undefined if value is empty/invalid
 */
const hashSha256 = (value) => {
    if (!value)
        return undefined;
    const normalized = value.trim().toLowerCase();
    // Do not re-hash if it's already a SHA-256 hash (64 characters hex)
    if (/^[a-f0-9]{64}$/i.test(normalized)) {
        return normalized;
    }
    return crypto_1.default.createHash('sha256').update(normalized).digest('hex');
};
exports.hashSha256 = hashSha256;
/**
 * Hashes an array of strings.
 */
const hashSha256Array = (values) => {
    if (!values || values.length === 0)
        return undefined;
    return values
        .map(val => (0, exports.hashSha256)(val))
        .filter((val) => !!val);
};
exports.hashSha256Array = hashSha256Array;
