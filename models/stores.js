"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class stores extends Model {
    static associate(models) {
      stores.hasMany(models.barangs, { as: "barang", foreignKey: "store_id" });
      stores.hasOne(models.barangs, { as: "item", foreignKey: "store_id" });
    }
  }
  stores.init(
    {
      owner: DataTypes.INTEGER,
      nama_toko: DataTypes.STRING,
      daerah: DataTypes.STRING,
      photo_profile: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "stores",
    }
  );
  return stores;
};
