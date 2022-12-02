import express from "express";
import { userRouter } from "./user.controller";
import { orderRouter } from "./order.controller";
import { authRouter } from "./auth.controller";
import { jwtMiddleware, errorMiddleware } from "../middleware";

export function routes(server: express.Express) {
  server.use("/api/user", jwtMiddleware, userRouter, errorMiddleware);
  server.use("/api/order", jwtMiddleware, orderRouter, errorMiddleware);
  server.use("/api/auth", authRouter, errorMiddleware);
}
