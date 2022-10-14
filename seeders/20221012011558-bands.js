'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('bands', [{
      name: 'Deftones',
      genre: 'alt metal',
      available_start_time: '18:00:00',
      end_time: '20:00:00'
    }], {});
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.bulkDelete('bands', null, {});
  }
};