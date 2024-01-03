'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order_Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Order_Product.init({
    quantity: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    order_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order_Product',
  });
  return Order_Product;
};