import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Vendor from "./vendor.js";
import Manager from "./manager.js";

const { DataTypes } = Sequelize;

const Transaction = db.define(
  "Transaction",
  {
    id_transaction: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM("sale", "income"),
      allowNull: false,
    },
    id_vendor: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Vendor,
        key: "id_vendor",
      },
    },

    id_manager: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Manager,
        key: "id_manager",
      },
    },
  },
  {
    freezeTableName: true,
  }
);

Vendor.hasMany(Transaction, { foreignKey: "id_vendor" });
Transaction.belongsTo(Vendor, { foreignKey: "id_vendor" });

Manager.hasMany(Transaction, { foreignKey: "id_manager" });
Transaction.belongsTo(Manager, { foreignKey: "id_manager" });

export default Transaction;
