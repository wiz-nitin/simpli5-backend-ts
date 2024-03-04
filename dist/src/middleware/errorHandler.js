"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const customError_1 = require("../lib/customError");
const output_1 = require("../services/output");
exports.default = (err, req, res, next) => {
    if (res.headersSent)
        next(err);
    return (0, output_1.error)(req, res, (0, customError_1.asCustomError)(err));
};
