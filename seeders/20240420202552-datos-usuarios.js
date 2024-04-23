'use strict';
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('Usuarios', [
       {
        nombreUsuario: "Kadir Perez",
        login: 'perez.kadir@gmail.com',
        password: 'Mambo3912',
        permisos: 'RWE',
        createdAt: new Date(),
        updatedAt: new Date()
       },
       {
        nombreUsuario: "Kimberly Salgado",
        login: 'salgado.kimberly@gmail.com',
        password: 'bachata2110',
        permisos: 'R',
        createdAt: new Date(),
        updatedAt: new Date()
       }
     ], {});
 },
  async down (queryInterface, Sequelize) {
   await queryInterface.bulkDelete('Usuarios', null, {});
  }
};