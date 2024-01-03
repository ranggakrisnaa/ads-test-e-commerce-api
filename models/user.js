'use strict';
const {
  Model
} = require('sequelize');
const BcryptUtil = require('../utils/BcryptUtil');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true },
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: { notEmpty: true },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,

      }
    },
    password: DataTypes.STRING
  }, {
    hooks: {
      beforeUpdate: async (user, option) => {
        const hashedPassword = await BcryptUtil.hashPassword(user.password);
        user.password = hashedPassword;
      },
      beforeCreate: async (user, option) => {
        const hashedPassword = await BcryptUtil.hashPassword(user.password);
        user.password = hashedPassword;
      },
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};