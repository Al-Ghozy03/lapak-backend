"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class barangs extends Model {
    static associate(models) {
      barangs.belongsToMany(models.stores, {
        as: "barang",
        foreignKey: "id",
        through: "",
      });
      barangs.belongsTo(models.stores, {
        as: "item",
        foreignKey: "id",
      });

      barangs.hasOne(models.orders, {
        as: "order_barang",
        foreignKey: "barang_id",
      });
    }
  }
  barangs.init(
    {
      store_id: DataTypes.INTEGER,
      nama_barang: DataTypes.STRING,
      harga: DataTypes.INTEGER,
      deskripsi: DataTypes.STRING,
      kategori: DataTypes.ENUM(
        "elektronik",
        "makanan",
        "fashion",
        "aksesoris",
        "buku"
      ),
      diskon: DataTypes.INTEGER,
      foto_barang: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "barangs",
    }
  );
  return barangs;
};
