'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Tags', [
      {
        tag: 'Apple Device',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        tag: 'Tablet',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Agrega más registros según sea necesario
    ], {});
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Tags', null, {});
  }
};

