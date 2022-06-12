"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class stores extends Model {
    static associate(models) {
      stores.hasMany(models.barangs, { as: "barang", foreignKey: "id" });
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
