"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.UserRoles = exports.UserPhoneNumberStatus = void 0;
const mongoose_1 = require("mongoose");
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
var UserPhoneNumberStatus;
(function (UserPhoneNumberStatus) {
    UserPhoneNumberStatus["Unverified"] = "unverified";
    UserPhoneNumberStatus["Verified"] = "verified";
})(UserPhoneNumberStatus || (exports.UserPhoneNumberStatus = UserPhoneNumberStatus = {}));
var UserRoles;
(function (UserRoles) {
    UserRoles["Admin"] = "admin";
    UserRoles["User"] = "user";
})(UserRoles || (exports.UserRoles = UserRoles = {}));
const userSchema = new mongoose_1.Schema({
    name: { type: String, trim: true, },
    email: { type: String, required: false, },
    phoneNumbers: [
        {
            type: {
                phoneNumber: { type: String },
                status: {
                    type: String,
                    enum: Object.values(UserPhoneNumberStatus),
                    default: UserPhoneNumberStatus.Verified,
                },
                primary: { type: Boolean, default: false },
            },
        },
    ],
    role: {
        type: String,
        enum: Object.values(UserRoles),
        default: UserRoles.Admin,
    }
}, { timestamps: true, versionKey: false });
userSchema.plugin(mongoose_paginate_v2_1.default);
exports.UserModel = (0, mongoose_1.model)('user', userSchema);
