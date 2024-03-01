import jwt from "jsonwebtoken";



export const createJwtToken = (payload: any) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  return token;
};

export const verifyJwtToken: any = (token: any) => {
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    return data;
  } catch (err) {
    return err
  }
};