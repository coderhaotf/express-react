import express, { NextFunction, Request, Response } from "express";
import { userModel } from "../model";
import { ResponseGenerator } from "../utils";
import jwt from "jsonwebtoken";

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

userRouter.get(
  "/detail",
  async (
    req: Request<any, any, any, { username: string }>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let name = req.query.username;
      if (!name) {
        let token = (req.headers["authorization"] ||
          req.headers["Authorization"]) as string;
        if (token) {
          token = token.split(" ")[1];
          const decodedToken = jwt.decode(token, {
            complete: true,
          }) as jwt.Jwt;
          // @ts-ignore
          name = decodedToken.payload.name;
        }
      }
      const model = await userModel.findOne({ where: { name } });
      if (model) {
        res.json(
          ResponseGenerator.success({ data: { user: model.dataValues } })
        );
      } else {
        res.json(ResponseGenerator.fail({ message: "用户不存在!" }));
      }
    } catch (error) {
      next(error);
    }
  }
);

export { userRouter };
