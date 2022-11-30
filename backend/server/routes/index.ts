import express, { NextFunction, Request, Response } from "express";

import { userRouter } from "./user.controller";
import { orderRouter } from "./order.controller";

function handleError(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err.stack);
  res.json({ error: err.message || err.toString() });
}

export function routes(server: express.Express) {
  server.use("/api/user", userRouter, handleError);
  server.use("/api/order", orderRouter, handleError);
}
