import { jwtMiddlewareCreator } from "./jwt";
import { errorMiddleware } from "./error";
import { Secret } from "jsonwebtoken";

const jwtMiddleware = jwtMiddlewareCreator({
  secret: process.env.jwt_secret_key as Secret,
  algorithms: ["HS256"],
});

export { jwtMiddleware, errorMiddleware };
