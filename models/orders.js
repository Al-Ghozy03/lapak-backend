"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      orders.belongsTo(models.users, {
        as: "order_user",
        foreignKey: "id",
      });

      orders.belongsTo(models.barangs,{as:"order_barang",foreignKey:"id"})
    }
  }
  orders.init(
    {
      user_id: DataTypes.INTEGER,
      barang_id: DataTypes.INTEGER,
      total_barang: DataTypes.INTEGER,
      total_harga: DataTypes.BIGINT,
      alamat: DataTypes.STRING,
      is_paid: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "orders",
    }
  );
  return orders;
};
