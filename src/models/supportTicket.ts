import {
  Schema,
  model,
  Document,
  Model,
  ObjectId,
} from 'mongoose';
import { IModel, IRef } from '../types/model';
import { IShareableUser } from './user';

export enum ISupportTicketStatus {
  OPEN = 'open',
  CLOSED = 'closed',
  RESOLVED = 'resolved',
}

export enum ISupportTicketCategory {
  ADMIN = 'admin',
  APP = 'app',
  CUSTOMER_CARE = 'customer_care'
}

export interface ISupportTicket {
  _id: ObjectId;
  user: IRef<ObjectId, IShareableUser>;
  status: ISupportTicketStatus;
}

export interface ISupportTicketDocument extends ISupportTicket, Document {
  _id: ObjectId;
}

export type ISupportTicketModel = IModel<ISupportTicket>;

const supportTicketSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'user' },
  name: { type: String },
  phoneNumber: { type: String },
  category: { type: String, enum: Object.values(ISupportTicketCategory), default: ISupportTicketCategory.APP },
  status: { type: String, enum: Object.values(ISupportTicketStatus), default: ISupportTicketStatus.OPEN },
  message: { type: String },
},{ timestamps: true, versionKey: false });

export const SupportTicketModel = model<ISupportTicketDocument, Model<ISupportTicket>>('support_ticket', supportTicketSchema);
