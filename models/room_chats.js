'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class room_chats extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  room_chats.init({
    from: DataTypes.INTEGER,
    to: DataTypes.INTEGER,
    room_code: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'room_chats',
  });
  return room_chats;
};