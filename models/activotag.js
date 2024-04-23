'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ActivoTag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ActivoTag.init({
    activoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Activo',
        key: 'id'
      }
    },
    tagId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Tag',
        key: 'id'
      }
    },
  }, {
    sequelize,
    modelName: 'ActivoTag',
  });
  return ActivoTag;
};