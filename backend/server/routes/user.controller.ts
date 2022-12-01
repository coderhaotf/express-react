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

userRouter.post(
  "/login",
  async (
    req: Request<any, any, { username: string; password: string }>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const data = req.body;
      if (data && data.username) {
        const user = await userModel.findOne({
          where: { name: data.username },
        });
        if (user) {
          res.json(ResponseGenerator.success({ message: "登录成功!" }));
        } else {
          res.json(
            ResponseGenerator.fail({ message: "账号密码错误, 请重试!" })
          );
        }
      } else {
        res.json(ResponseGenerator.fail({ message: "缺少参数!" }));
      }
    } catch (error) {
      next(error);
    }
  }
);

export { userRouter };
