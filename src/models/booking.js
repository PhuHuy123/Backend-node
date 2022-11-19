'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking.hasMany(models.Examination,{foreignKey: 'bookingId', as: 'dataBooking'})

      Booking.belongsTo(models.User,{foreignKey: 'patientId', targetKey: 'id', as: 'patientData'})
      Booking.belongsTo(models.Allcode,{foreignKey: 'gender', targetKey: 'keyMap', as: 'genderData2'})

    }
  };
  Booking.init({
    statusId: DataTypes.STRING,
    patientId: DataTypes.INTEGER,
    email: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    address: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    gender: DataTypes.STRING,
    birthday: DataTypes.DATE,
    token: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};
