'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.User, { foreignKey: "user_id" })
      Order.hasMany(models.Order_Product, { foreignKey: "order_id" })
      Order.belongsToMany(models.Product, {
        foreignKey: "order_id",
        through: models.Order_Product
      })
    }
  }
  Order.init({
    invoice: DataTypes.STRING,
    total_price: DataTypes.INTEGER,
    status: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};