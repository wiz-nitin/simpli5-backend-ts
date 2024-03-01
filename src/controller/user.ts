import { ErrorTypes } from "../lib/constants";
import CustomError, { asCustomError } from "../lib/customError";
import { verifyRequiredFields } from "../lib/requestData";
import { IRequestHandler } from "../types/request";
import * as output from '../services/output';
import * as UserServiceTypes from '../services/user/types';
import * as UserService from '../services/user';

export const register: IRequestHandler<{}, {}, UserServiceTypes.IRegisterUserData> = async (req, res) => {
    try {
        const { body } = req;
        const requiredFields = ['name', 'email', 'phoneNumber'];

        const { isValid, missingFields } = verifyRequiredFields(requiredFields, body);
        if (!isValid) {
            output.error(
                req,
                res,
                new CustomError(
                    `Invalid input. Body requires the following fields: ${missingFields.join(', ')}.`,
                    ErrorTypes.INVALID_ARG,
                ),
            );
            return;
        }
        const { email, name, phoneNumber } = body;
        const { user, authKey } = await UserService.register({ email, name, phoneNumber });
        output.api(req, res, user, authKey);
    } catch (err) {
        output.error(req, res, asCustomError(err));
    }
};