import { sequelize } from "../setup";
import { DataTypes, Model } from "sequelize";

enum Type {
  pending = "pending",
  completed = "completed",
  deleted = "deleted",
}

export interface OrderType {
  id?: string;
  type: Type;
  price: number;
  num: number;
}

export const orderModel = sequelize.define<Model<OrderType>>("order", {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUIDV4,
  },
  type: {
    allowNull: false,
    values: [...Object.values(Type)],
    type: DataTypes.STRING,
  },
  price: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  num: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
});
