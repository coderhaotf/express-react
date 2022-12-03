import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    detail: {
      preTurnover: 0,
      preNums: 0,
      turnover: 0,
      nums: 0,
    },
  },
  reducers: {
    setDetail: (state, { payload: { turnover, nums } }) => {
      const { turnover: preTurnover, nums: preNums } = state.detail;
      state.detail = { preNums, preTurnover, turnover, nums };
    },
  },
});

export { orderSlice };
