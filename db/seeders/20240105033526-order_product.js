'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Order_Products', [{
      id: 9991,
      quantity: 10,
      price: 745000,
      order_id: 9991,
      product_id: 9992,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      id: 9992,
      quantity: 10,
      price: 360000,
      order_id: 9991,
      product_id: 9993,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('Order_Products', null, {});
  }
};
