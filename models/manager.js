import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import User from "./user.js";
import Vendor from "./vendor.js";
import Transaction from "./transaction.js";

const { DataTypes } = Sequelize;

const Manager = db.define(
  "Manager",
  {
    id_manager: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

// Define relations
User.hasOne(Manager, { foreignKey: "id_user" });
Manager.belongsTo(User, { foreignKey: "id_user" });

Manager.hasMany(Vendor, { foreignKey: "id_manager" });
Vendor.belongsTo(Manager, { foreignKey: "id_manager" });

export default Manager;
