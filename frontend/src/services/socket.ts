import { io, Socket } from "socket.io-client";
import { orderSlice, store } from "../store";

let socket: Socket;

let index = 0;
const types = ["pending", "completed", "deleted"];
const createOrder = () => {
  return {
    index: index++,
    type: types[Math.ceil(Math.random() * 100) % 3],
    price: Math.ceil(Math.random() * 1000),
    num: Math.ceil(Math.random() * 100),
  };
};

const setupSocketIO = () => {
  if (socket) return socket;
  socket = io("/", {
    reconnection: true,
    autoConnect: true,
    transports: ["polling", "websocket"],
    withCredentials: true,
  });

  socket.on("disconnect", () => {
    console.log("socket: ## disconnected");
  });

  socket.on("reconnect", (attemptNumber) => {
    console.log("socket: $$ reconnected", attemptNumber);
  });

  socket.on("countOrder", (payload: any, cb: Function) => {
    console.log("countOrder: ", payload);
    store.dispatch(orderSlice.actions.setDetail(payload));
    cb(payload);
  });

  setInterval(() => {
    socket.emit("addOrder", createOrder(), (payload: any) => {
      console.log("addOrder: ", payload);
    });
  }, 3000);
};

export { setupSocketIO };
