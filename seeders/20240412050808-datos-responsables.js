'use strict';
module.exports = {
 async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('Responsables', [
       {
         numEmpleado: 3532,
         nombre: "John Doe",
         createdAt: new Date(),
         updatedAt: new Date()
       },
       {
         numEmpleado: 2421,
         nombre: "Jane Doe",
         createdAt: new Date(),
         updatedAt: new Date()
       }
     ], {});
 },
 async down (queryInterface, Sequelize) {
   await queryInterface.bulkDelete('Responsables', null, {});
 }
};