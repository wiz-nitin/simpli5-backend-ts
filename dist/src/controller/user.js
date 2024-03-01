"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const constants_1 = require("../lib/constants");
const customError_1 = __importStar(require("../lib/customError"));
const requestData_1 = require("../lib/requestData");
const output = __importStar(require("../services/output"));
const UserService = __importStar(require("../services/user"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        const requiredFields = ['name', 'email', 'phoneNumber'];
        const { isValid, missingFields } = (0, requestData_1.verifyRequiredFields)(requiredFields, body);
        if (!isValid) {
            output.error(req, res, new customError_1.default(`Invalid input. Body requires the following fields: ${missingFields.join(', ')}.`, constants_1.ErrorTypes.INVALID_ARG));
            return;
        }
        const { email, name, phoneNumber } = body;
        const { user, authKey } = yield UserService.register({ email, name, phoneNumber });
        output.api(req, res, user, authKey);
    }
    catch (err) {
        output.error(req, res, (0, customError_1.asCustomError)(err));
    }
});
exports.register = register;
