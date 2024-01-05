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
    await queryInterface.bulkInsert('Products', [{
      id: 9991,
      title: "NEW BALANCE Made In USA 990v6",
      description: "NEW BALANCE lifestyle women shoes",
      SKU: "PROD-001",
      price: 4900000,
      stock: 200,
      img_url: 'https://www.newbalance.co.id/media/catalog/product/cache/c1feb3550df60acd013ba17bf29e4991/0/1/01-NEW-BALANCE-FFSSBNEWA-NEWW990GL6-Grey.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      id: 9992,
      title: "New Balance Proffesional Athletic Men's Hoodie",
      description: "New Balance Proffesional Athletic Mens Hoodie - Beige",
      SKU: "PROD-002",
      price: 745000,
      stock: 250,
      img_url: 'https://www.newbalance.co.id/media/catalog/product/cache/c1feb3550df60acd013ba17bf29e4991/0/8/0888-NEWMT33913LW0180XL-1.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      id: 9993,
      title: "New Balance OPP Core Large Unisex Waist Bag",
      description: "New Balance OPP Core Large Unisex's Waist Bag - Black",
      SKU: "PROD-003",
      price: 360000,
      stock: 180,
      img_url: 'https://www.newbalance.co.id/media/catalog/product/cache/c1feb3550df60acd013ba17bf29e4991/0/8/0888-NEWLAB23101B005OSZ-1.jpg',
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
    await queryInterface.bulkDelete('Products', null, {});
  }
};
