import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Vendor from "./vendor.js";

const { DataTypes } = Sequelize;

const Item = db.define(
  "Item",
  {
    id_item: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
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
  },
  {
    freezeTableName: true,
  }
);

// Relasi
Vendor.hasMany(Item, { foreignKey: "id_vendor" });
Item.belongsTo(Vendor, { foreignKey: "id_vendor" });

export default Item;
