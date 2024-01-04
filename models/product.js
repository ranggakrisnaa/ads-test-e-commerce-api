'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.hasMany(models.Chart, { foreignKey: "product_id" })
      Product.belongsToMany(models.User, {
        foreignKey: "product_id",
        through: models.Chart
      })
      Product.hasMany(models.Order_Product, { foreignKey: "product_id" })
      Product.belongsToMany(models.Order, {
        foreignKey: "product_id",
        through: models.Order_Product
      })
    }
  }
  Product.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    SKU: DataTypes.STRING,
    price: DataTypes.STRING,
    stock: DataTypes.STRING,
    img_url: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};