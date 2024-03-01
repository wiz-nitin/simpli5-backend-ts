import { Document, PaginateModel, Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { IModel } from "../types/model";

export enum UserPhoneNumberStatus {
  Unverified = 'unverified',
  Verified = 'verified',
}

export enum UserRoles {
  Admin = 'admin',
  User = 'user'
}

export interface IPhoneNumber {
  phoneNumber: string;
  status: UserPhoneNumberStatus;
  primary: boolean;
}

export interface IShareableUser {
  email: string;
  name: string;
  role: UserRoles;
  phoneNumbers: IPhoneNumber[];
}

export interface IUser extends IShareableUser {
}

export interface IUserDocument extends IUser, Document { }
export type IUserModel = IModel<IUser>;

const userSchema = new Schema({
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

userSchema.plugin(mongoosePaginate);

export const UserModel = model<IUserDocument, PaginateModel<IUser>>('user', userSchema);
