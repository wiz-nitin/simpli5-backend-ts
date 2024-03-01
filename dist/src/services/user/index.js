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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const constants_1 = require("../../lib/constants");
const customError_1 = __importDefault(require("../../lib/customError"));
const requestData_1 = require("../../lib/requestData");
const user_1 = require("../../models/user");
const Session = __importStar(require("../session"));
const register = ({ name, email, phoneNumber }) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        // Validate email and phone number
        if (!(0, requestData_1.validateEmail)(email)) {
            throw new customError_1.default('Invalid email.', constants_1.ErrorTypes.INVALID_ARG);
        }
        else if (!(0, requestData_1.validatePhoneNumber)(phoneNumber)) {
            throw new customError_1.default('Invalid phone number.', constants_1.ErrorTypes.INVALID_ARG);
        }
        // Check that all required fields are present
        if (!name)
            throw new customError_1.default('A name is required.', constants_1.ErrorTypes.INVALID_ARG);
        if (!email)
            throw new customError_1.default('A email is required.', constants_1.ErrorTypes.INVALID_ARG);
        if (!phoneNumber)
            throw new customError_1.default('A phoneNumber is required.', constants_1.ErrorTypes.INVALID_ARG);
        // get the user By phone Number
        const user = yield user_1.UserModel.findOne({ $or: [{ "phoneNumbers.phoneNumber": phoneNumber }, { "email": email }] });
        if (user) {
            throw new customError_1.default(' details is already associated with a user. Please sign in or use a different number & email.', constants_1.ErrorTypes.CONFLICT);
        }
        // format the email and name in lower case
        email = (_a = email === null || email === void 0 ? void 0 : email.toLowerCase()) === null || _a === void 0 ? void 0 : _a.trim();
        name = (_b = name === null || name === void 0 ? void 0 : name.toLowerCase()) === null || _b === void 0 ? void 0 : _b.trim();
        const phoneNumbers = [{ phoneNumber, status: user_1.UserPhoneNumberStatus.Verified, primary: true }];
        // prepare data for creat the new User
        const parmas = {
            email,
            name,
            phoneNumbers,
            role: user_1.UserRoles.User,
        };
        // create the new User
        const newUser = yield user_1.UserModel.create(parmas);
        if (!newUser)
            throw new customError_1.default('Error creating user...', constants_1.ErrorTypes.SERVER);
        try {
            let authKey = '';
            authKey = Session.createJwtToken({ userId: newUser._id });
            const responseInfo = {
                user: newUser,
                authKey,
            };
            return responseInfo;
        }
        catch (afterCreationError) {
            // undo user creation
            yield user_1.UserModel.deleteOne({ _id: newUser === null || newUser === void 0 ? void 0 : newUser._id });
            throw new customError_1.default('Error creating user', constants_1.ErrorTypes.SERVER);
        }
    }
    catch (error) {
        throw new customError_1.default(`Error creating user: ${error} `, constants_1.ErrorTypes.GEN);
    }
});
exports.register = register;
