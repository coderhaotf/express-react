import express, { NextFunction, Request, Response } from "express";
import { userModel } from "../model";
import { ResponseGenerator, generateAccessToken } from "../utils";

const authRouter = express.Router();

authRouter.post(
  "/login",
  async (
    req: Request<any, any, { username: string; password: string }>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const data = req.body;
      if (data && data.username && data.password) {
        const model = await userModel.findOne({
          where: { name: data.username, password: data.password },
        });
        if (model) {
          const auth = {
            token: generateAccessToken(
              model.dataValues,
              (process.env.jwt as any)?.secret_key as string,
              {
                expiresIn: (process.env.jwt as any)?.expired,
              }
            ),
          };
          res.json(
            ResponseGenerator.success({
              message: "登录成功!",
              data: { auth, user: model.dataValues },
            })
          );
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

authRouter.post(
  "/register",
  async (
    req: Request<any, any, { username: string; password: string }>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const data = req.body;
      if (data && data.username && data.password) {
        const user = await userModel.findOne({
          where: { name: data.username },
        });
        if (user) {
          res.json(
            ResponseGenerator.fail({
              message: "本账号已存在!",
            })
          );
        } else {
          const newUser = await userModel.create({
            name: data.username,
            password: data.password,
          });
          res.json(
            ResponseGenerator.success({ data: newUser, message: "注册成功!" })
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

export { authRouter };
