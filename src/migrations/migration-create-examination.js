"use strict";
export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Examinations", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      bookingId: {
        type: Sequelize.INTEGER,
      },
      doctorId: {
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      timeType: {
        type: Sequelize.STRING,
      },
      date: {
        type: Sequelize.DATE,
      },
      reason: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.STRING,
      },
      comment: {
        type: Sequelize.STRING,
      },
      statusId: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Examinations");
  },
};
