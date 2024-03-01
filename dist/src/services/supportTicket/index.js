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
exports.submitSupportTicket = void 0;
const constants_1 = require("../../lib/constants");
const customError_1 = __importDefault(require("../../lib/customError"));
const supportTicket_1 = require("../../models/supportTicket");
const user_1 = require("../../models/user");
const email_1 = require("../email");
// export const sendEmailToSupport = async (supportTicketId: string) => {
//   const supportTicket = await SupportTicketModel.findById(supportTicketId);
//   if (!supportTicket) throw new Error('Support ticket not found');
// };
const submitSupportTicket = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { requestor } = req;
    const { phoneNumber, category, name, message } = req.body;
    // Check that all required fields are present
    if (!name)
        throw new customError_1.default('A name is required.', constants_1.ErrorTypes.INVALID_ARG);
    if (!phoneNumber)
        throw new customError_1.default('A phoneNumber is required.', constants_1.ErrorTypes.INVALID_ARG);
    if (!category)
        throw new customError_1.default('A category is required.', constants_1.ErrorTypes.INVALID_ARG);
    if (!message)
        throw new customError_1.default('A message is required.', constants_1.ErrorTypes.INVALID_ARG);
    const userInfo = yield user_1.UserModel.findById(requestor._id);
    if (!userInfo)
        throw new Error('User not found');
    // create a new supporticket
    const supportTicket = new supportTicket_1.SupportTicketModel({
        phoneNumber, category, name, message
    });
    const savedSuccess = yield supportTicket.save();
    if (!savedSuccess)
        throw new Error('Unable to save support ticket. Please email support@simpli5.com');
    (0, email_1.sendSupportTicketEmailToSupport)({
        user: userInfo,
        message,
        supportTicketId: savedSuccess._id.toString(),
    });
    if (!!savedSuccess) {
        return 'Support ticket created successfully. Someone from the Simpli5 team will be in touch with you shortly.';
    }
});
exports.submitSupportTicket = submitSupportTicket;
