"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../lib/constants");
const customError_1 = __importDefault(require("../lib/customError"));
const output_1 = require("../services/output");
const authenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.requestor) {
        (0, output_1.error)(req, res, new customError_1.default('Authentication failed.', constants_1.ErrorTypes.AUTHENTICATION));
        return;
    }
    next();
});
exports.default = authenticate;
