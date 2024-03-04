"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupportTicketModel = exports.ISupportTicketCategory = exports.ISupportTicketStatus = void 0;
const mongoose_1 = require("mongoose");
var ISupportTicketStatus;
(function (ISupportTicketStatus) {
    ISupportTicketStatus["OPEN"] = "open";
    ISupportTicketStatus["CLOSED"] = "closed";
    ISupportTicketStatus["RESOLVED"] = "resolved";
})(ISupportTicketStatus || (exports.ISupportTicketStatus = ISupportTicketStatus = {}));
var ISupportTicketCategory;
(function (ISupportTicketCategory) {
    ISupportTicketCategory["ADMIN"] = "admin";
    ISupportTicketCategory["APP"] = "app";
    ISupportTicketCategory["CUSTOMER_CARE"] = "customer_care";
})(ISupportTicketCategory || (exports.ISupportTicketCategory = ISupportTicketCategory = {}));
const supportTicketSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'user' },
    name: { type: String },
    phoneNumber: { type: String },
    category: { type: String, enum: Object.values(ISupportTicketCategory), default: ISupportTicketCategory.APP },
    status: { type: String, enum: Object.values(ISupportTicketStatus), default: ISupportTicketStatus.OPEN },
    message: { type: String },
}, { timestamps: true, versionKey: false });
exports.SupportTicketModel = (0, mongoose_1.model)('support_ticket', supportTicketSchema);
