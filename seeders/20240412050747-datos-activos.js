'use strict';
module.exports = {
 async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('Activos', [
       {
         numSerie: 12345,
         numInventario: 9876,
         descripcion: "ipad",
         createdAt: new Date(),
         updatedAt: new Date()
       },
       {
         numSerie: 12346,
         numInventario: 9878,
         descripcion: "iphone",
         createdAt: new Date(),
         updatedAt: new Date()
       }
     ], {});
 },
 async down (queryInterface, Sequelize) {
   await queryInterface.bulkDelete('Activos', null, {});
 }
};
