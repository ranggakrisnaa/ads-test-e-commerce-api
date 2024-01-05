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
    await queryInterface.bulkInsert('Users', [{
      id: 9991,
      email: "johndoe@gmail.com",
      name: "John Doe",
      username: "john doe",
      password: "doe123",
      role: "customer",
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      id: 9992,
      email: "kevinfoe@gmail.com",
      name: "kevin foe",
      username: "kevin foe",
      password: "kevin123",
      role: "seller",
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {})
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};
