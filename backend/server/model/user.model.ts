import { sequelize } from "../setup";
import { DataTypes, Model } from "sequelize";

export const userModel = sequelize.define<
  Model<{ id?: string; name: string; password: string; age?: number }>
>("user", {
  id: {
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  age: {
    allowNull: true,
    type: DataTypes.INTEGER,
  },
});
