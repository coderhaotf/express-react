import { configureStore } from "@reduxjs/toolkit";
import { orderSlice } from "./orderSlice";

export const store = configureStore({
  reducer: {
    order: orderSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
