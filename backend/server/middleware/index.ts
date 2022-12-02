import { jwtMiddlewareCreator } from "./jwt";
import { errorMiddleware } from "./error";

const jwtMiddleware = jwtMiddlewareCreator({
  secret: "shhhhhhared-secret",
  algorithms: ["HS256"],
});

export { jwtMiddleware, errorMiddleware };
