import { AwsClient } from "../../clients/aws";
import { EmailAddresses, ErrorTypes } from "../../lib/constants";
import CustomError from "../../lib/customError";
import { ISupportEmailVerificationTemplateParams } from "./types";
import fs from 'fs';
import Handlebars, { template } from 'handlebars';
import path from 'path';
import dayjs from 'dayjs';

const awsClient = new AwsClient();

type EmailClientArgs<TemplateData> = {
  to: string;
  subject: string;
  templatePath: string;
  templateData: TemplateData;
};

export const sendSupportTicketEmailToSupport = async ({
  user,
  recipientEmail = EmailAddresses.ReplyTo,
  senderEmail = EmailAddresses.ReplyTo,
  replyToAddresses = [EmailAddresses.ReplyTo],
  supportTicket,
  supportTicketId,
}: ISupportEmailVerificationTemplateParams) => {
  const { email } = user;
  const { name, phoneNumber, category, message } = supportTicket
  // const userPhoneNumber = phoneNumbers.find((e) => !!e.primary).phoneNumber;
  const subject = `New Support Ticket: ${supportTicketId}`;
  const templatePath = path.join(__dirname, '..', '..', 'templates', 'supportTemplate.hbs');
  const source = fs.readFileSync(templatePath, { encoding: 'utf-8' });
  const template = Handlebars.compile(source);
  const emailTemplate: string = template({ name, email, phoneNumber, message, category });
  const emailResponse = awsClient.sendMail({
    userData: user,
    emailTemplate,
    subject,
    senderEmail,
    replyToAddresses,
    recipientEmail,
  });
  return emailResponse;
};
