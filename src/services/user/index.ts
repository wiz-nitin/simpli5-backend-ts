import { ErrorTypes } from "../../lib/constants";
import CustomError, { asCustomError } from "../../lib/customError";
import { validateEmail, validatePhoneNumber } from "../../lib/requestData";
import { IUser, IUserDocument, IUserModel, UserModel, UserPhoneNumberStatus, UserRoles } from "../../models/user";
import { IRequest } from "../../types/request";
import { IRegisterUserData } from "./types";
import * as Session from '../session';


export const register = async ({ name, email, phoneNumber }: IRegisterUserData) => {
    try {

        // Validate email and phone number
        if (!validateEmail(email)) {
            throw new CustomError('Invalid email.', ErrorTypes.INVALID_ARG);
        } else if (!validatePhoneNumber(phoneNumber)) {
            throw new CustomError('Invalid phone number.', ErrorTypes.INVALID_ARG);
        }

        // Check that all required fields are present
        if (!name) throw new CustomError('A name is required.', ErrorTypes.INVALID_ARG);
        if (!email) throw new CustomError('A email is required.', ErrorTypes.INVALID_ARG);
        if (!phoneNumber) throw new CustomError('A phoneNumber is required.', ErrorTypes.INVALID_ARG);

        // // get the user By phone Number
        // const existingUser = await UserModel.findOne({ $or: [{ "phoneNumbers.phoneNumber": phoneNumber }, { "email": email }] })
        // if (existingUser) {
        //     throw new CustomError(' details is already associated with a user. Please sign in or use a different number & email.', ErrorTypes.CONFLICT);
        // }

        // format the email and name in lower case
        email = email?.toLowerCase()?.trim();
        name = name?.toLowerCase()?.trim();
        const phoneNumbers = [{ phoneNumber, status: UserPhoneNumberStatus.Verified, primary: true }];

        // prepare data for creat the new User
        const parmas: any = {
            email,
            name,
            phoneNumbers,
            role: UserRoles.User,
        }
        // // create the new User
        // const newUser = await UserModel.create(parmas);
        // if (!newUser) throw new CustomError('Error creating user...', ErrorTypes.SERVER);
        const userData = await UserModel.findOneAndUpdate(
            { "phoneNumbers.phoneNumber": phoneNumber },
            parmas,
            { upsert: true, new: true }
        )
        try {
            let authKey = '';
            authKey = Session.createJwtToken({ userId: userData._id })

            const responseInfo: any = {
                user: userData,
                authKey,
            };

            return responseInfo;
        } catch (afterCreationError) {
            // undo user creation
            await UserModel.deleteOne({ _id: userData?._id });
            throw new CustomError('Error creating user', ErrorTypes.SERVER);
        }

    } catch (error) {
        throw new CustomError(`Error creating user: ${error} `, ErrorTypes.GEN);
    }
}