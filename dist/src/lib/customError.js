"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asCustomError = void 0;
const constants_1 = require("./constants");
class CustomError extends Error {
    constructor(msg, data) {
        super(msg);
        this.isCustomError = true;
        this.data = data || constants_1.ErrorTypes.GEN;
    }
}
const asCustomError = (err, code) => {
    let error;
    if (err.isCustomError) {
        error = err;
    }
    else if (err.errors) {
        error = new CustomError(err.errors[Object.keys(err.errors)[0]], constants_1.ErrorTypes.INVALID_ARG);
    }
    else if (typeof err === 'string') {
        error = new CustomError(err, code);
    }
    else if (err.config) {
        error = new CustomError(err.response.data.error_message, constants_1.ErrorTypes.SERVER);
    }
    else {
        error = new CustomError(err.message, code);
    }
    return error;
};
exports.asCustomError = asCustomError;
exports.default = CustomError;
