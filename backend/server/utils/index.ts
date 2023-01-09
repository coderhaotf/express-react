import jwt, { Secret, SignOptions } from "jsonwebtoken";
import bcrypt from "bcrypt";

/**
 * ResponseGenerator
 */
export const ResponseGenerator = {
  success: (response: { data?: any; message?: string; [key: string]: any }) => {
    return { success: true, message: "请求成功!", ...response };
  },
  fail: (response: { data?: any; message?: string; [key: string]: any }) => {
    return { success: false, message: "请求失败!", ...response };
  },
};

/**
 * generate JWT token
 * @param payload
 * @param secretOrPrivateKey
 * @param options
 * @returns
 */
export const generateAccessToken = (
  payload: string | Buffer | object,
  secretOrPrivateKey: Secret,
  options?: SignOptions
) => {
  return jwt.sign(payload, secretOrPrivateKey, {
    ...options,
  });
};

/**
 *
 * @param data
 * @param saltRounds
 * @returns
 */
export const encode = (data: string | Buffer, saltRounds = 10) => {
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(data, salt);
  return hash;
};

/**
 *
 * @param data
 * @param encrypted
 * @returns
 */
export const decode = (data: string | Buffer, encrypted: string) => {
  return bcrypt.compareSync(data, encrypted);
};
