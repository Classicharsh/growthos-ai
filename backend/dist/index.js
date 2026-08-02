"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from the backend .env file first
dotenv_1.default.config();
// Load environment variables from the root .env.local file to share variables with Next.js
dotenv_1.default.config({ path: path_1.default.join(__dirname, '../../.env.local') });
const app_1 = __importDefault(require("./app"));
const logger_1 = require("./utils/logger");
const PORT = process.env.PORT || 5001;
app_1.default.listen(PORT, () => {
    logger_1.logger.info(`Server is running on port ${PORT}`);
});
