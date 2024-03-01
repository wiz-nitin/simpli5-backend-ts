"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJwtToken = exports.createJwtToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createJwtToken = (payload) => {
    const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET);
    return token;
};
exports.createJwtToken = createJwtToken;
const verifyJwtToken = (token) => {
    try {
        const data = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        return data;
    }
    catch (err) {
        return err;
    }
};
exports.verifyJwtToken = verifyJwtToken;
