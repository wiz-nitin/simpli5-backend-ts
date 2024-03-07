import { IUserDocument } from "../../models/user";
import { ISubmitSupportTicketRequest } from "../supportTicket";

export interface ISupportEmailVerificationTemplateParams {
  domain?: string;
  message: string;
  replyToAddresses?: string[];
  senderEmail?: string;
  user?: IUserDocument;
  subject?: string;
  supportTicket: any;
  supportTicketId: string;
  recipientEmail?: string;
}
export enum EmailTemplateKeys {
  SupportTicket = 'supportTicket',
}
export enum EmailTemplateTypes {
  Support = 'support',
}
export interface IBuildTemplateParams {
  templateName: EmailTemplateKeys;
  templatePath?: string;
  data: any;
  stylePath?: string;
  templateType?: EmailTemplateTypes;
}

export interface IEmailTemplateConfig {
  name: EmailTemplateKeys;
  type: EmailTemplateTypes;
}

export const EmailTemplateConfigs: { [key: string]: IEmailTemplateConfig } = {

  SupportTicket: {
    name: EmailTemplateKeys.SupportTicket,
    type: EmailTemplateTypes.Support,
  }
};