import express, { NextFunction, Request, Response } from "express";
import { userModel } from "../model";

const userRouter = express.Router();

userRouter.get(
  "/list",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const list = await userModel.findAll();
      res.json(list || []);
    } catch (error) {
      next(error);
    }
  }
);

export { userRouter };
