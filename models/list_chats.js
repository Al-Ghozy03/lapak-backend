"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class list_chats extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      list_chats.belongsTo(models.users, {
        as: "receiver_message",
        foreignKey: "id",
      });


    }
  }
  list_chats.init(
    {
      receiver: DataTypes.INTEGER,
      room_code: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "list_chats",
    }
  );
  return list_chats;
};
