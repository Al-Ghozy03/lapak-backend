"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class stores extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      stores.hasMany(models.barangs,{as:"barang",foreignKey:"store_id"})
      stores.belongsToMany(models.barangs,{as:"coba",foreignKey:"store_id",through:""})
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
