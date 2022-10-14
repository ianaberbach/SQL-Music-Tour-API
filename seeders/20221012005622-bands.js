'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('bands', [{
      name: 'Pig Destroyer',
      genre: 'grindcore',
      available_start_time: '23:00:00',
      end_time: '04:00:00'
    }], {});
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.bulkDelete('bands', null, {});
  }
};
