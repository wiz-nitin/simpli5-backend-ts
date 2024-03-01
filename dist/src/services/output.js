"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.error = exports.api = void 0;
const constants_1 = require("../lib/constants");
const logger_1 = require("./logger");
const setAuthHeader = (req, res, tkn, Itkn) => {
    const token = tkn || req.get(constants_1.AUTHKEY_HEADER);
    const deviceToken = Itkn || req.get(constants_1.DEVICE_IDENTIFIER);
    if (token === constants_1.TOKEN_REMOVE) {
        res.removeHeader(constants_1.AUTHKEY_HEADER);
    }
    else {
        const headers = {
            [constants_1.AUTHKEY_HEADER]: token,
        };
        if (deviceToken) {
            headers[constants_1.DEVICE_IDENTIFIER] = deviceToken;
        }
        res.header(headers);
    }
};
const api = (req, res, data, authToken = '', code = 200, deviceToken = '') => {
    setAuthHeader(req, res, authToken, deviceToken);
    res.set('Content-Type', 'application/json');
    res.set('Access-Control-Expose-Headers', 'authKey, identifierKey');
    res.statusCode = code;
    res.send(data);
};
exports.api = api;
const error = (req, res, customError, authToken = '') => {
    var _a;
    logger_1.Logger.error(customError, req);
    setAuthHeader(req, res, authToken);
    res.set('Content-Type', 'application/json');
    res.statusCode = ((_a = customError === null || customError === void 0 ? void 0 : customError.data) === null || _a === void 0 ? void 0 : _a.code) || 400;
    res.send({
        message: customError.message,
    });
};
exports.error = error;
