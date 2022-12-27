"use strict";
const { Model } = require("sequelize");
export default (sequelize, DataTypes) => {
  class Examination extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Examination.belongsTo(models.Booking, {
        foreignKey: "bookingId",
        targetKey: "id",
        as: 'dataBooking'
      });
      Examination.belongsTo(models.Allcode,{foreignKey: 'timeType', targetKey: 'keyMap', as: 'timeTypeDataExamination'})

      Examination.belongsTo(models.User, {
        foreignKey: "doctorId",
        targetKey: "id",
        as: 'dataDoctor'
      });
    }
  }
  Examination.init(
    {
      bookingId: DataTypes.INTEGER,
      doctorId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      timeType: DataTypes.STRING,
      date: DataTypes.DATE,
      reason: DataTypes.STRING,
      price: DataTypes.STRING,
      comment: DataTypes.STRING,
      statusId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Examination",
    }
  );
  return Examination;
};
