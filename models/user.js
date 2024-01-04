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
      User.hasMany(models.Chart, { foreignKey: "user_id" })
      User.belongsToMany(models.Product, {
        foreignKey: "user_id",
        through: models.Chart
      })
      User.hasMany(models.Order, { foreignKey: "user_id" })

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
        isEmail: true

      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true },
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true },
    }
  }, {
    hooks: {
      beforeUpdate: (user, option) => {
        const hashedPassword = BcryptUtil.hashPassword(user.password);
        user.password = hashedPassword;
      },
      beforeCreate: (user, option) => {
        const hashedPassword = BcryptUtil.hashPassword(user.password);
        user.password = hashedPassword;
      },
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};