import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Manager from "./manager.js";

const { DataTypes } = Sequelize;

const IncomeReport = db.define(
  "IncomeReport",
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
    total_income: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

Manager.hasMany(IncomeReport, { foreignKey: "id_manager" });
IncomeReport.belongsTo(Manager, { foreignKey: "id_manager" });

export default IncomeReport;
