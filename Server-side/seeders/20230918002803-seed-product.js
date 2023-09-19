'use strict';

const db = require('../db.json')

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

    const product = db.products.map((el) => {
      delete el.id
      el.createdAt = new Date();
      el.updatedAt = new Date();
      return el;
    })

    const image = db.images.map((el) => {
      delete el.id
      el.createdAt = new Date();
      el.updatedAt = new Date();
      return el;
    })


    await queryInterface.bulkInsert('Products', product, {});
    await queryInterface.bulkInsert('Images', image, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Images", null);
    await queryInterface.bulkDelete("Product", null);
  }
};
