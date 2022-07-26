'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Specialty extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Specialty.hasMany(models.DoctorInfo,{foreignKey: 'specialtyId', as: 'specialtyData'})
    }
  };
  Specialty.init({
    descriptionHTML: DataTypes.TEXT('long'),
    descriptionMarkdown: DataTypes.TEXT('long'),
    image: DataTypes.STRING,
    name: DataTypes.STRING,

  }, {
    sequelize,
    modelName: 'Specialty',
  });
  return Specialty;
};
