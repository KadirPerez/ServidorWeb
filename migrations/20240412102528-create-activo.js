'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Activos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      numSerie: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true
      },
      numInventario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true
      },
      descripcion: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      idResponsable: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Responsables',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpload: 'CASCADE'
      },
      idUbicacion: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Ubicacions',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpload: 'CASCADE'
      },
      imagen: {
        type: Sequelize.BLOB,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Activos');
  }
};