'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        username: 'admin',
        password: '$2y$10$Mc8.3JE4W8mdw63ceyvpTuQxwRGWquRvJN1sBKNiHFxeh.7eft4ZK',
        email: 'rascocunhelo@gmail.com',
        firstName: 'Vaskel',
        lastName: 'Melunha',
        rank: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'Crazy',
        password: '$2y$10$quqrjGcbjyirx5451Jjm/eA6d88RnS94viCDopcOWfdH3TZqm4Li.',
        email: 'sapinho@gmail.com',
        firstName: 'Crazy',
        lastName: 'Frog',
        rank: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'Rui',
        password: '$2y$10$7qdfcVkZVx1sYXojhA6RueHbaLMAYiv9b/6eiiAyzq632lT.ewAMq',
        email: 'fsala@gmail.com',
        firstName: 'Rui',
        lastName: 'Ferreira',
        rank: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'Gabriel Carvalho',
        password: '$2y$10$17vgyw.b/tWmIGrfL67gBeDcLZZBadMVDLKsYT4At9MTQn8hhQwgG',
        email: 'gcfc44@xbox.jp',
        firstName: 'Gabriel',
        lastName: 'Carvalho',
        rank: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'Wúl10',
        password: '$2y$10$17vgyw.b/tWmIGrfL67gBeDcLZZBadMVDLKsYT4At9MTQn8hhQwgG',
        email: 'ninjaGaia@outlook.com',
        firstName: 'Ninja',
        lastName: 'Gaia',
        rank: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'Celorica',
        password: '$2y$10$17vgyw.b/tWmIGrfL67gBeDcLZZBadMVDLKsYT4At9MTQn8hhQwgG',
        email: 'marcelo10@iol.pt',
        firstName: 'Mr',
        lastName: 'President',
        rank: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};