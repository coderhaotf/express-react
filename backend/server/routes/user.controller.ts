import express, { NextFunction, Request, Response } from "express";
import { userModel } from "../model";
import { ResponseGenerator } from "../utils";

const userRouter = express.Router();

userRouter.get(
  "/list",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const list = await userModel.findAll();
      res.json(ResponseGenerator.success({ data: list || [] }));
    } catch (error) {
      next(error);
    }
  }
);

export { userRouter };
