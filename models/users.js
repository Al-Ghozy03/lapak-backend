"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      users.hasOne(models.orders, {
        as: "order_user",
        foreignKey: "user_id",
      });
    }
  }
  users.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      phone: DataTypes.BIGINT,
      alamat: DataTypes.STRING,
      photo_profile: DataTypes.STRING,
      hasStore: DataTypes.BOOLEAN,
      store_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "users",
    }
  );
  return users;
};
