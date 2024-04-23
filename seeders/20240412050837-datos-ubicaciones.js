'use strict';
module.exports = {
 async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('Ubicacions', [
       {
         descripcion: "Oficina principal",
         createdAt: new Date(),
         updatedAt: new Date()
       },
       {
         descripcion: "Sala de reuniones",
         createdAt: new Date(),
         updatedAt: new Date()
       }
     ], {});
 },
 async down (queryInterface, Sequelize) {
   await queryInterface.bulkDelete('Ubicacions', null, {});
 }
};