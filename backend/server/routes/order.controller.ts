import express, { NextFunction, Request, Response } from "express";
import { orderModel } from "../model";
import { ResponseGenerator } from "../utils";

const orderRouter = express.Router();

orderRouter.get(
  "/list",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const list = await orderModel.findAll();
      res.json(ResponseGenerator.success({ data: list || [] }));
    } catch (error) {
      next(error);
    }
  }
);

export { orderRouter };
