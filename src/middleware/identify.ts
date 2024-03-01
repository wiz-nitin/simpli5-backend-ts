import { Request, Response, NextFunction } from 'express-serve-static-core';
import { IUserDocument, UserModel } from '../models/user';
import * as UserService from '../services/user';
import * as Session from '../services/session';
import { IRequest } from '../types/request';

const identify = async (req: Request, _: Response, next: NextFunction) => {
  let authKey = req.header?.('authKey');

  if (!authKey && !!req.headers) {
    authKey = req.headers.authKey;
  }

  if (!authKey) return next();

  try {
    const { userId } = await Session.verifyJwtToken(authKey);
    if (!userId) return next();
    if (userId) {
      const user = await UserModel.findById(userId);

      (req as IRequest).requestor = user as IUserDocument;
      (req as IRequest).authKey = authKey;
    }
  } catch (e) {
    return next();
  }
  return next();
};

export default identify;
