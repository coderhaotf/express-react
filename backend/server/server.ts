import cors from "cors";
import express from "express";
import session from "express-session";
import http from "http";
import compression from "compression";
import dotenv from "dotenv";
import path from "path";
import { authenticate, sequelize, sync } from "./setup";
// 注册业务表, 全局导入
import "./model";
import { routes } from "./routes";
import { clientErrorHandler, errorHandler } from "./middleware";
import { createTerminus, HealthCheck } from "@godaddy/terminus";

// 配置环境变量
dotenv.config();

const dev = process.env.NODE_ENV !== "production";
const port = process.env.PORT || 9090;

const server = express();

server.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    name: process.env.SESSION_NAME,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      // expires in 7 days
      maxAge: 7 * 24 * 60 * 60 * 1000,
      domain: dev ? "localhost" : process.env.COOKIE_DOMAIN,
      secure: !dev,
    },
  })
);

server.use(compression());

server.use(cors());

server.use(express.json());

server.use(express.static(path.join(process.cwd(), "public")));

server.use(clientErrorHandler);

server.use(errorHandler);

// 注册路由
routes(server);

server.get("*", (_, res) => {
  res.statusCode = 403;
  res.send("此路由没有权限!");
});

const httpServer = http.createServer(server);
httpServer.listen(port, () => {
  console.log("server start at port: ", port);
  authenticate().then(sync);
});

// start cleanup of resource, like databases or file descriptors
async function onSignal() {
  console.log("server is starting cleanup");
  if (sequelize) {
    sequelize.close().catch((reason) => {
      console.error(reason);
    });
  }
}

const onHealthCheck: HealthCheck = async ({ state }) => {
  // checks if the system is healthy, like the db connection is live
  // resolves, if health, rejects if not
  if (state && state.isShuttingDown) {
    // do something
  }
};

createTerminus(httpServer, {
  signal: "SIGINT",
  healthChecks: { "/healthcheck": onHealthCheck },
  onSignal,
});
