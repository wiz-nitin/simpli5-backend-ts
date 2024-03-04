import { AwsClient } from "../../clients/aws";
import { EmailAddresses, ErrorTypes } from "../../lib/constants";
import CustomError from "../../lib/customError";
import { ISupportEmailVerificationTemplateParams } from "./types";
import fs from 'fs';
import Handlebars, { template } from 'handlebars';
import path from 'path';
import dayjs from 'dayjs';

const awsClient = new AwsClient();

// export const buildTemplate = ({ templateName, data, templatePath, templateType }: IBuildTemplateParams) => {
//   // Add Template Content and Styles for this particular email
//   const _bodyPath = templatePath || path.join(__dirname, '..', '..', 'templates', 'email', templateName, 'template.hbs');
//   const _templateStylePath = path.join(__dirname, '..', '..', 'templates', 'email', templateName, 'style.hbs');
//   if (!fs.existsSync(_bodyPath)) throw new CustomError('Template not found for email', ErrorTypes.INVALID_ARG);
//   const bodyString = fs.readFileSync(_bodyPath, 'utf8');
//   Handlebars.registerPartial('body', bodyString);


//   if (fs.existsSync(_templateStylePath)) {
//     const rawCss = fs.readFileSync(_templateStylePath, 'utf8');
//     const styleTemplateRaw = Handlebars.compile(rawCss);
//     const styleTemplate = styleTemplateRaw({ colors });
//     data.templateStyle = styleTemplate;
//   }

//   // Add shared Footer Content and Styles
//   const _footerPath = path.join(__dirname, '..', '..', 'templates', 'email', 'shareableTemplates', 'footer', 'template.hbs');
//   const _footerStylePath = path.join(__dirname, '..', '..', 'templates', 'email', 'shareableTemplates', 'footer', 'style.hbs');
//   if (!fs.existsSync(_footerPath)) throw new CustomError('Footer file not found', ErrorTypes.INVALID_ARG);
//   if (!fs.existsSync(_footerStylePath)) throw new CustomError('Footer style file not found', ErrorTypes.INVALID_ARG);
//   const footerString = fs.readFileSync(_footerPath, 'utf8');
//   Handlebars.registerPartial('footer', footerString);

//   if (fs.existsSync(_footerStylePath)) {
//     const rawCss = fs.readFileSync(_footerStylePath, 'utf8');
//     const styleTemplateRaw = Handlebars.compile(rawCss);
//     const styleTemplate = styleTemplateRaw({ colors });
//     data.footerStyle = styleTemplate;
//   }

//   // Add shared Base Email and Styles
//   const _stylePath = path.join(__dirname, '..', '..', 'templates', 'email', 'style.hbs');
//   const _baseEmailPath = templatePath || path.join(__dirname, '..', '..', 'templates', 'email', 'baseEmail.hbs');
//   if (!fs.existsSync(_baseEmailPath)) throw new CustomError('Base email file not found', ErrorTypes.INVALID_ARG);
//   const templateString = fs.readFileSync(_baseEmailPath, 'utf8');

//   if (fs.existsSync(_stylePath)) {
//     const rawCss = fs.readFileSync(_stylePath, 'utf8');
//     const styleTemplateRaw = Handlebars.compile(rawCss);
//     const styleTemplate = styleTemplateRaw({ colors });
//     data.style = styleTemplate;
//   }

//   // Compile and return template
//   const template = Handlebars.compile(templateString);
//   data.currentYear = dayjs().year().toString();
//   return template(data);
// };

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
  message,
  supportTicketId,
}: ISupportEmailVerificationTemplateParams) => {
  const { name, email, phoneNumbers } = user;
  const userPhoneNumber = phoneNumbers.find((e) => !!e.primary).phoneNumber;
  const subject = `New Support Ticket: ${supportTicketId}`;
  const templatePath = path.join(__dirname, '..', '..', 'templates', 'supportTemplate.hbs');
  const source = fs.readFileSync(templatePath, { encoding: 'utf-8' });
  const template = Handlebars.compile(source);
  const emailTemplate: string = template({ name, email, phoneNumber: userPhoneNumber, message });
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
