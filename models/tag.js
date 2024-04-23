'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Tag.belongsToMany(models.Activo, {
        through: 'ActivoTag',
        foreignKey: 'tagId',
        otherKey: 'activoId'
      });
    }
  }
  Tag.init({
    tag: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Tag',
  });
  return Tag;
};