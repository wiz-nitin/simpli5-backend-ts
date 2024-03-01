"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const constants_1 = require("../lib/constants");
exports.default = () => (0, cors_1.default)({
    origin: (origin, callback) => {
        // allow requests with no origin
        // (like mobile apps or curl requests)
        if (!origin)
            return callback(null, true);
        if (constants_1.AllowedOrigins.indexOf(origin) === -1) {
            console.log('cors blocked', origin, constants_1.AllowedOrigins);
            const msg = 'The CORS policy for this site does not '
                + 'allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    allowedHeaders: ['Authorization', 'authkey', 'content-type', 'X-Requested-With', 'serviceName', 'X-KW-API-ID', 'X-KW-API-Key'],
    exposedHeaders: ['API-Token-Expiry'],
    credentials: true,
});
