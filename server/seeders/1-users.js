'use strict';

const { v4: uuidv4 } = require('uuid');

// Create an array to store the user UUIDs
const userUUIDs = [];

const usersData = [
  {
    id: uuidv4(),
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
    id: uuidv4(),
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
    id: uuidv4(),
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
    id: uuidv4(),
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
    id: uuidv4(),
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
    id: uuidv4(),
    username: 'Celorica',
    password: '$2y$10$17vgyw.b/tWmIGrfL67gBeDcLZZBadMVDLKsYT4At9MTQn8hhQwgG',
    email: 'marcelo10@iol.pt',
    firstName: 'Mr',
    lastName: 'President',
    rank: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// Add the UUIDs to the array
for (const user of usersData) {
  userUUIDs.push(user.id);
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', usersData, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },

  // Export the UUIDs
  userUUIDs,
};