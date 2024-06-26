'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Characteristics', [
      { caracType: 'Categories', caracValue: 'Smartphone', caracImg: 'assets/uploads/smartphones.jpg', createdAt: new Date(), updatedAt: new Date() },
      { caracType: 'Categories', caracValue: 'CPU', caracImg: 'assets/uploads/cpu.jpg', createdAt: new Date(), updatedAt: new Date() },
      { caracType: 'Categories', caracValue: 'GPU', caracImg: 'assets/uploads/gpu.webp', createdAt: new Date(), updatedAt: new Date() },
      { caracType: 'Categories', caracValue: 'Computer', caracImg: 'assets/uploads/computers.jpg', createdAt: new Date(), updatedAt: new Date() },
      { caracType: 'Categories', caracValue: 'Mouse', caracImg: 'assets/uploads/mouses.jpeg', createdAt: new Date(), updatedAt: new Date() },
      { caracType: 'Categories', caracValue: 'Keyboard', caracImg: 'assets/uploads/keyboards.jpg', createdAt: new Date(), updatedAt: new Date() },
      { caracType: 'Categories', caracValue: 'Monitor', caracImg: 'assets/uploads/monitores.webp', createdAt: new Date(), updatedAt: new Date() },
      { caracType: 'Categories', caracValue: 'RAM', caracImg: 'assets/uploads/rams.jpg', createdAt: new Date(), updatedAt: new Date() },
      { caracType: 'Categories', caracValue: 'SSD', caracImg: 'assets/uploads/ssd.webp', createdAt: new Date(), updatedAt: new Date() },
      { caracType: 'Categories', caracValue: 'HDD', caracImg: 'assets/uploads/hdd.png', createdAt: new Date(), updatedAt: new Date() },
      { caracType: 'Categories', caracValue: 'Power Supply', caracImg: 'assets/uploads/power_supply.webp', createdAt: new Date(), updatedAt: new Date() },
      { caracType: 'Tamanho', caracValue: '6.1"', caracImg: 'assets/placeholder-1-1.webp', createdAt: new Date(), updatedAt: new Date() },
      { caracType: 'Tamanho', caracValue: '6.2"', caracImg: 'assets/placeholder-1-1.webp', createdAt: new Date(), updatedAt: new Date() },
      { caracType: 'Tamanho', caracValue: '6.0"', caracImg: 'assets/placeholder-1-1.webp', createdAt: new Date(), updatedAt: new Date() },
      { caracType: 'Tamanho', caracValue: '6.7"', caracImg: 'assets/placeholder-1-1.webp', createdAt: new Date(), updatedAt: new Date() },
      { caracType: 'Tamanho', caracValue: '6.81"', caracImg: 'assets/placeholder-1-1.webp', createdAt: new Date(), updatedAt: new Date() },
      { caracType: 'Tamanho', caracValue: '6.5"', caracImg: 'assets/placeholder-1-1.webp', createdAt: new Date(), updatedAt: new Date() },
      { caracType: 'Tamanho', caracValue: '6.8"', caracImg: 'assets/placeholder-1-1.webp', createdAt: new Date(), updatedAt: new Date() },
      { caracType: 'Tamanho', caracValue: 'N/A', caracImg: 'assets/placeholder-1-1.webp', createdAt: new Date(), updatedAt: new Date() },
      { caracType: 'Tamanho', caracValue: '27"', caracImg: 'assets/placeholder-1-1.webp', createdAt: new Date(), updatedAt: new Date() },
      { caracType: 'Tamanho', caracValue: '16GB', caracImg: 'assets/placeholder-1-1.webp', createdAt: new Date(), updatedAt: new Date() },
      { caracType: 'Tamanho', caracValue: '1TB', caracImg: 'assets/placeholder-1-1.webp', createdAt: new Date(), updatedAt: new Date() },
      { caracType: 'Tamanho', caracValue: '2TB', caracImg: 'assets/placeholder-1-1.webp', createdAt: new Date(), updatedAt: new Date() },
      { caracType: 'Tamanho', caracValue: '850W', caracImg: 'assets/placeholder-1-1.webp', createdAt: new Date(), updatedAt: new Date() },
      { caracType: 'Condition', caracValue: 'Excellent', caracImg: 'assets/placeholder-1-1.webp', createdAt: new Date(), updatedAt: new Date() },
      { caracType: 'Condition', caracValue: 'Good', caracImg: 'assets/placeholder-1-1.webp', createdAt: new Date(), updatedAt: new Date() },
      { caracType: 'Condition', caracValue: 'Average', caracImg: 'assets/placeholder-1-1.webp', createdAt: new Date(), updatedAt: new Date() },
      { caracType: 'Condition', caracValue: 'Bad', caracImg: 'assets/placeholder-1-1.webp', createdAt: new Date(), updatedAt: new Date() },
      { caracType: 'Condition', caracValue: 'Very Bad', caracImg: 'assets/placeholder-1-1.webp', createdAt: new Date(), updatedAt: new Date() }
    
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Characteristics', null, {});
  }
};