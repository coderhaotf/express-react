import { Server, Socket } from "socket.io";
import http from "http";
import { createOrder, countOrder } from "./handles";
import { OrderType } from "./model";

let socketIO: Server;

let pending = false;
let timer: NodeJS.Timer;

const setupSocketIO = ({ httpServer }: { httpServer: http.Server }) => {
  if (socketIO) return socketIO;
  socketIO = new Server(httpServer, {
    // 处理跨域请求
    cors: {
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: false,
    },
  });

  socketIO.on("connection", (socket: Socket<any, any, any>) => {
    socket.on("addOrder", (payload: OrderType, cb: Function) => {
      createOrder({
        type: payload.type,
        price: payload.price,
        num: payload.num,
      }).then((res) => {
        // console.log(payload);
        cb(payload);
      });
    });

    if (timer) {
      clearInterval(timer);
    }
    timer = setInterval(() => {
      if (pending === true) return;
      pending = true;
      countOrder()
        .then((res) => {
          socket.emit("countOrder", res, (payload: any) => {
            //   console.log(payload);
          });
        })
        .finally(() => {
          pending = false;
        });
    }, 3000);
  });

  return socketIO;
};

export { setupSocketIO };
