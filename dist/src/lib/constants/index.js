"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authTokenDays = exports.AllowedOrigins = exports.EmailSubject = exports.EmailAddresses = exports.DEVICE_IDENTIFIER = exports.TOKEN_REMOVE = exports.AUTHKEY_HEADER = exports.ErrorTypes = void 0;
exports.ErrorTypes = {
    AUTHENTICATION: { name: 'Authentication', code: 401 },
    CONFLICT: { name: 'Conflict', code: 409 },
    GEN: { name: 'Error', code: 400 },
    FORBIDDEN: { name: 'Forbidden', code: 403 }, // user is known, but lacks the necessary permissions
    INVALID_ARG: { name: 'InvalidArgument', code: 422 },
    NOT_ALLOWED: { name: 'NotAllowed', code: 405 },
    NOT_FOUND: { name: 'NotFound', code: 404 },
    SERVER: { name: 'ServerError', code: 500 },
    SERVICE: { name: 'ServiceError', code: 422 },
    TOKEN: { name: 'JsonWebTokenError', code: 400 },
    UNAUTHORIZED: { name: 'Unauthorized', code: 401 }, // invalid credentials have been provided
    UNPROCESSABLE: { name: 'UnprocessableEntity', code: 422 },
    TOO_MANY_REQUESTS: { name: 'TooManyRequests', code: 429 },
};
exports.AUTHKEY_HEADER = 'authKey';
exports.TOKEN_REMOVE = 'remove_me';
exports.DEVICE_IDENTIFIER = 'identifierKey';
var EmailAddresses;
(function (EmailAddresses) {
    EmailAddresses["NoReply"] = "no-reply@simpli5.com";
    EmailAddresses["ReplyTo"] = "dev@simpli5.in";
    EmailAddresses["Support"] = "support@simpli5.com";
})(EmailAddresses || (exports.EmailAddresses = EmailAddresses = {}));
var EmailSubject;
(function (EmailSubject) {
    EmailSubject["Support"] = "Support";
})(EmailSubject || (exports.EmailSubject = EmailSubject = {}));
exports.AllowedOrigins = [
    'http://localhost:3000',
    'https://localhost:3000'
];
exports.authTokenDays = 30; // 30 days   
