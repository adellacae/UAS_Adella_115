import { DataTypes } from "sequelize";
import db from "../config/Database.js";
import Item from "./item.js";
import Manager from "./manager.js";

const SalesReport = db.define(
  "SalesReport",
  {
    id_report: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    report_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    total_items_sold: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total_revenue: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

Manager.hasMany(SalesReport, { foreignKey: "id_manager" });
SalesReport.belongsTo(Manager, { foreignKey: "id_manager" });

Item.hasMany(SalesReport, { foreignKey: "id_item" });
SalesReport.belongsTo(Item, { foreignKey: "id_item" });

export default SalesReport;
