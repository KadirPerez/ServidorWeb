'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ubicacion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Ubicacion.hasMany(models.Activo, {
        foreignKey: 'idUbicacion'
      })
    }
  }
  Ubicacion.init({
    descripcion:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    imagen: {
      type: DataTypes.BLOB('long'),
      allowNull: true,
    },
    nombreImagen: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Ubicacion',
  });
  return Ubicacion;
};