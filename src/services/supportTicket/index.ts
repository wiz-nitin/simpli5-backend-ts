import { ObjectId } from 'mongoose';
import { EmailAddresses, EmailSubject, ErrorTypes } from '../../lib/constants';
import CustomError from '../../lib/customError';
import { SupportTicketModel } from '../../models/supportTicket';
import { IShareableUser, UserModel } from '../../models/user';
import { IRef } from '../../types/model';
import { IRequest } from '../../types/request';
import { sendSupportTicketEmailToSupport } from '../email';
// import { sendSupportTicketEmailToSupport } from '../email';

export interface ISubmitSupportTicketRequest {
  user?: IRef<ObjectId, IShareableUser>;
  name: string;
  category: string;
  phoneNumber: string;
  message: string;
}

// export const sendEmailToSupport = async (supportTicketId: string) => {
//   const supportTicket = await SupportTicketModel.findById(supportTicketId);
//   if (!supportTicket) throw new Error('Support ticket not found');
// };

export const submitSupportTicket = async (req: IRequest<{}, {}, ISubmitSupportTicketRequest>) => {
  const { requestor } = req;
  const { phoneNumber, category, name, message } = req.body;
  // Check that all required fields are present
  if (!name) throw new CustomError('A name is required.', ErrorTypes.INVALID_ARG);
  if (!phoneNumber) throw new CustomError('A phoneNumber is required.', ErrorTypes.INVALID_ARG);
  if (!category) throw new CustomError('A category is required.', ErrorTypes.INVALID_ARG);
  if (!message) throw new CustomError('A message is required.', ErrorTypes.INVALID_ARG);


  const userInfo = await UserModel.findById(requestor._id);

  if (!userInfo) throw new Error('User not found');

  // create a new supporticket
  const supportTicket = new SupportTicketModel({
    phoneNumber, category, name, message
  });

  const savedSuccess = await supportTicket.save();
  if (!savedSuccess) throw new Error('Unable to save support ticket. Please email support@simpli5.com');

  sendSupportTicketEmailToSupport({
    user:userInfo,
    message,
    supportTicket,
    supportTicketId: savedSuccess._id.toString(),
  });

  if (!!savedSuccess) {
    return 'Support ticket created successfully. Someone from the Simpli5 team will be in touch with you shortly.';
  }
};
