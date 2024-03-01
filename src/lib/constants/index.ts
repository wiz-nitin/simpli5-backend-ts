export interface ICustomErrorBody {
    name: string;
    code: number;
}

export interface IErrorType {
    AUTHENTICATION: ICustomErrorBody;
    CONFLICT: ICustomErrorBody;
    GEN: ICustomErrorBody;
    FORBIDDEN: ICustomErrorBody;
    INVALID_ARG: ICustomErrorBody;
    NOT_ALLOWED: ICustomErrorBody;
    NOT_FOUND: ICustomErrorBody;
    SERVER: ICustomErrorBody;
    SERVICE: ICustomErrorBody;
    TOKEN: ICustomErrorBody;
    UNAUTHORIZED: ICustomErrorBody;
    UNPROCESSABLE: ICustomErrorBody;
    TOO_MANY_REQUESTS: ICustomErrorBody;
}

export const ErrorTypes = {
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

export const AUTHKEY_HEADER = 'authKey';
export const TOKEN_REMOVE = 'remove_me';
export const DEVICE_IDENTIFIER = 'identifierKey';

export enum EmailAddresses {
    NoReply = 'no-reply@simpli5.com',
    ReplyTo = 'dev@simpli5.in',//'support@simpli5.com',
    Support = 'support@simpli5.com'
}

export enum EmailSubject {
    Support = 'Support'
}

export const AllowedOrigins = [
    'http://localhost:3000',
    'https://localhost:3000'
];

export const authTokenDays = 30; // 30 days   