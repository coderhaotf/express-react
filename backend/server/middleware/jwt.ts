import jwt from "jsonwebtoken";
import express from "express";
import { unless } from "express-unless";
import { CommonError } from "../common";

type ErrorCode =
  | "credentials_bad_scheme"
  | "credentials_bad_format"
  | "credentials_required"
  | "invalid_token"
  | "revoked_token";

export class UnauthorizedError extends CommonError {
  constructor(code: ErrorCode, message: string) {
    super(message, 403, code);
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
    this.name = "UnauthorizedError";
  }
}

/**
 * A function that defines how to retrieve the verification key given the express request and the JWT.
 */
export type GetSecretKey = (
  req: express.Request,
  token: jwt.Jwt | undefined
) => jwt.Secret | Promise<jwt.Secret>;

/**
 * @deprecated use GetSecretKey
 */
export type SecretCallback = GetSecretKey;

/**
 * @deprecated use GetSecretKey
 */
export type SecretCallbackLong = GetSecretKey;

/**
 * A function to check if a token is revoked
 */
export type IsRevoked = (
  req: express.Request,
  token: jwt.Jwt | undefined
) => boolean | Promise<boolean>;

/**
 * A function to customize how a token is retrieved from the express request.
 */
export type TokenGetter = (
  req: express.Request
) => string | Promise<string> | undefined;

type Params = {
  /**
   * The Key or a function to retrieve the key used to verify the JWT.
   */
  secret: jwt.Secret | GetSecretKey;

  /**
   * Defines how to retrieves the token from the request object.
   */
  getToken?: TokenGetter;

  /**
   * Defines how to verify if a token is revoked.
   */
  isRevoked?: IsRevoked;

  /**
   * If sets to true, continue to the next middleware when the
   * request doesn't include a token without failing.
   *
   * @default true
   */
  credentialsRequired?: boolean;

  /**
   * Allows to customize the name of the property in the request object
   * where the decoded payload is set.
   * @default 'auth'
   */
  requestProperty?: string;

  /**
   * List of JWT algorithms allowed.
   */
  algorithms: jwt.Algorithm[];
} & jwt.VerifyOptions;

/**
 * @deprecated this breaks tsc when using strict: true
 */
export type ExpressJwtRequest<T = jwt.JwtPayload> = express.Request & {
  auth: T;
};

/**
 * @deprecated use Request<T>
 */
export type ExpressJwtRequestUnrequired<T = jwt.JwtPayload> =
  express.Request & { auth?: T };

/**
 * The Express Request including the "auth" property with the decoded JWT payload.
 */
export type Request<T = jwt.JwtPayload> = express.Request & { auth?: T };

/**
 * Returns an express middleware to verify JWTs.
 *
 * @param options {Params}
 * @returns
 */
export const jwtMiddlewareCreator = (options: Params) => {
  if (!options?.secret)
    throw new RangeError("express-jwt: `secret` is a required option");
  if (!options.algorithms)
    throw new RangeError("express-jwt: `algorithms` is a required option");
  if (!Array.isArray(options.algorithms))
    throw new RangeError("express-jwt: `algorithms` must be an array");

  const getSecretKey: GetSecretKey =
    typeof options.secret === "function"
      ? options.secret
      : async () => options.secret as jwt.Secret;

  const credentialsRequired =
    typeof options.credentialsRequired === "undefined"
      ? true
      : options.credentialsRequired;
  const requestProperty =
    typeof options.requestProperty === "string"
      ? options.requestProperty
      : "auth";

  const jwtMiddleware = async function (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    let token: string | undefined;
    try {
      if (
        req.method === "OPTIONS" &&
        req.headers["access-control-request-headers"]
      ) {
        const hasAuthInAccessControl = req.headers[
          "access-control-request-headers"
        ]
          .split(",")
          .map((header) => header.trim().toLowerCase())
          .includes("authorization");
        if (hasAuthInAccessControl) {
          return next();
        }
      }

      const authorizationHeader =
        req.headers && "Authorization" in req.headers
          ? "Authorization"
          : "authorization";
      if (options.getToken && typeof options.getToken === "function") {
        token = await options.getToken(req);
      } else if (req.headers && req.headers[authorizationHeader]) {
        const parts = (req.headers[authorizationHeader] as string).split(" ");
        if (parts.length == 2) {
          const scheme = parts[0];
          const credentials = parts[1];

          if (/^Bearer$/i.test(scheme)) {
            token = credentials;
          } else {
            if (credentialsRequired) {
              throw new UnauthorizedError(
                "credentials_bad_scheme",
                "Format is Authorization: Bearer [token]"
              );
            } else {
              return next();
            }
          }
        } else {
          throw new UnauthorizedError(
            "credentials_bad_format",
            "Format is Authorization: Bearer [token]"
          );
        }
      }

      if (!token) {
        if (credentialsRequired) {
          throw new UnauthorizedError(
            "credentials_required",
            "No authorization token was found"
          );
        } else {
          return next();
        }
      }

      let decodedToken: jwt.Jwt;

      try {
        decodedToken = jwt.decode(token, { complete: true }) as jwt.Jwt;
      } catch (err) {
        throw new UnauthorizedError("invalid_token", (err as Error).message);
      }

      const key = await getSecretKey(req, decodedToken);

      try {
        jwt.verify(token, key, options);
      } catch (err) {
        throw new UnauthorizedError("invalid_token", (err as Error).message);
      }

      const isRevoked =
        (options.isRevoked && (await options.isRevoked(req, decodedToken))) ||
        false;
      if (isRevoked) {
        throw new UnauthorizedError(
          "revoked_token",
          "The token has been revoked."
        );
      }

      const request = req as Request<jwt.JwtPayload | string>;
      //@ts-ignore
      request[requestProperty] = decodedToken.payload;
      next();
    } catch (err) {
      return next(err);
    }
  };

  jwtMiddleware.unless = unless;

  return jwtMiddleware;
};
