'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      email: 'admin@gmail.com',
      password: '111111',
      firstName: 'Huy',
      lastName: 'Nguyen',
      address: 'USA',
      gender: 1,
      typeRole: 'ROLE',
      ketRole: 'R1',
      image: 'ima.png',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
