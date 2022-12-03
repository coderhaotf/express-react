import { orderModel, OrderType } from "../model";
import { v4 } from "uuid";

/**
 * 新增order
 * @param order
 * @returns
 */
export const createOrder = async (order: OrderType) => {
  try {
    const model = await orderModel.create({ id: v4(), ...order });
    return model.dataValues;
  } catch (error) {
    console.error(error);
  }
  return Promise.reject();
};

/**
 * 统计
 * @returns
 */
export const countOrder = async () => {
  try {
    const list = await orderModel.findAll({
      where: {
        type: "completed",
      },
    });
    return list
      .map((item) => item.dataValues)
      .reduce(
        (acc, cur) => {
          acc.turnover += cur.price + cur.num;
          acc.nums += cur.num;
          return acc;
        },
        { turnover: 0, nums: 0 }
      );
  } catch (error) {
    console.error(error);
  }
  return Promise.reject();
};
