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
exports.sendSupportTicketEmailToSupport = void 0;
const aws_1 = require("../../clients/aws");
const constants_1 = require("../../lib/constants");
const fs_1 = __importDefault(require("fs"));
const handlebars_1 = __importDefault(require("handlebars"));
const path_1 = __importDefault(require("path"));
const awsClient = new aws_1.AwsClient();
const sendSupportTicketEmailToSupport = ({ user, recipientEmail = 'nitinsayshe@gmail.com', //EmailAddresses.Support,
senderEmail = constants_1.EmailAddresses.ReplyTo, replyToAddresses = [constants_1.EmailAddresses.ReplyTo], message, supportTicketId, }) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, phoneNumbers } = user;
    const userPhoneNumber = phoneNumbers.find((e) => !!e.primary).phoneNumber;
    const subject = `New Support Ticket: ${supportTicketId}`;
    const templatePath = path_1.default.join(__dirname, '..', '..', 'templates', 'supportTemplate.hbs');
    const source = fs_1.default.readFileSync(templatePath, { encoding: 'utf-8' });
    const template = handlebars_1.default.compile(source);
    const emailTemplate = template({ name, email, phoneNumber: userPhoneNumber, message });
    const emailResponse = awsClient.sendMail({
        userData: user,
        emailTemplate,
        subject,
        senderEmail,
        replyToAddresses,
        recipientEmail,
    });
    return emailResponse;
});
exports.sendSupportTicketEmailToSupport = sendSupportTicketEmailToSupport;
