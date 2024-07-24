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
      { caracType: 'Size', caracValue: '6.1"', caracImg: 'assets/placeholder-1-1.webp', createdAt: new Date(), updatedAt: new Date() },
      { caracType: 'Size', caracValue: '6.2"', caracImg: 'assets/placeholder-1-1.webp', createdAt: new Date(), updatedAt: new Date() },
      { caracType: 'Size', caracValue: '6.0"', caracImg: 'assets/placeholder-1-1.webp', createdAt: new Date(), updatedAt: new Date() },
      { caracType: 'Size', caracValue: '6.7"', caracImg: 'assets/placeholder-1-1.webp', createdAt: new Date(), updatedAt: new Date() },
      { caracType: 'Size', caracValue: '6.81"', caracImg: 'assets/placeholder-1-1.webp', createdAt: new Date(), updatedAt: new Date() },
      { caracType: 'Size', caracValue: '6.5"', caracImg: 'assets/placeholder-1-1.webp', createdAt: new Date(), updatedAt: new Date() },
      { caracType: 'Size', caracValue: '6.8"', caracImg: 'assets/placeholder-1-1.webp', createdAt: new Date(), updatedAt: new Date() },
      { caracType: 'Size', caracValue: 'N/A', caracImg: 'assets/placeholder-1-1.webp', createdAt: new Date(), updatedAt: new Date() },
      { caracType: 'Size', caracValue: '27"', caracImg: 'assets/placeholder-1-1.webp', createdAt: new Date(), updatedAt: new Date() },
      { caracType: 'Size', caracValue: '16GB', caracImg: 'assets/placeholder-1-1.webp', createdAt: new Date(), updatedAt: new Date() },
      { caracType: 'Size', caracValue: '1TB', caracImg: 'assets/placeholder-1-1.webp', createdAt: new Date(), updatedAt: new Date() },
      { caracType: 'Size', caracValue: '2TB', caracImg: 'assets/placeholder-1-1.webp', createdAt: new Date(), updatedAt: new Date() },
      { caracType: 'Size', caracValue: '850W', caracImg: 'assets/placeholder-1-1.webp', createdAt: new Date(), updatedAt: new Date() },
      { caracType: 'Condition', caracValue: 'Excellent', caracImg: 'assets/placeholder-1-1.webp', createdAt: new Date(), updatedAt: new Date() },
      { caracType: 'Condition', caracValue: 'Good', caracImg: 'assets/placeholder-1-1.webp', createdAt: new Date(), updatedAt: new Date() },
      { caracType: 'Condition', caracValue: 'Average', caracImg: 'assets/placeholder-1-1.webp', createdAt: new Date(), updatedAt: new Date() },
      { caracType: 'Condition', caracValue: 'Bad', caracImg: 'assets/placeholder-1-1.webp', createdAt: new Date(), updatedAt: new Date() },
      { caracType: 'Condition', caracValue: 'Very Bad', caracImg: 'assets/placeholder-1-1.webp', createdAt: new Date(), updatedAt: new Date() },

      // Brands
{ caracType: 'Brand', caracValue: 'Apple', caracImg: 'assets/placeholder-1-1.webp', createdAt: new Date(), updatedAt: new Date() },
{ caracType: 'Brand', caracValue: 'Samsung', caracImg: 'assets/placeholder-1-1.webp', createdAt: new Date(), updatedAt: new Date() },
{ caracType: 'Brand', caracValue: 'Google', caracImg: 'assets/placeholder-1-1.webp', createdAt: new Date(), updatedAt: new Date() },
{ caracType: 'Brand', caracValue: 'OnePlus', caracImg: 'assets/placeholder-1-1.webp', createdAt: new Date(), updatedAt: new Date() },
{ caracType: 'Brand', caracValue: 'Xiaomi', caracImg: 'assets/placeholder-1-1.webp', createdAt: new Date(), updatedAt: new Date() },
{ caracType: 'Brand', caracValue: 'Sony', caracImg: 'assets/placeholder-1-1.webp', createdAt: new Date(), updatedAt: new Date() },
{ caracType: 'Brand', caracValue: 'Intel', caracImg: 'assets/placeholder-1-1.webp', createdAt: new Date(), updatedAt: new Date() },
{ caracType: 'Brand', caracValue: 'AMD', caracImg: 'assets/placeholder-1-1.webp', createdAt: new Date(), updatedAt: new Date() },
{ caracType: 'Brand', caracValue: 'NVIDIA', caracImg: 'assets/placeholder-1-1.webp', createdAt: new Date(), updatedAt: new Date() },
{ caracType: 'Brand', caracValue: 'Dell', caracImg: 'assets/placeholder-1-1.webp', createdAt: new Date(), updatedAt: new Date() },
{ caracType: 'Brand', caracValue: 'Logitech', caracImg: 'assets/placeholder-1-1.webp', createdAt: new Date(), updatedAt: new Date() },
{ caracType: 'Brand', caracValue: 'Razer', caracImg: 'assets/placeholder-1-1.webp', createdAt: new Date(), updatedAt: new Date() },
{ caracType: 'Brand', caracValue: 'Corsair', caracImg: 'assets/placeholder-1-1.webp', createdAt: new Date(), updatedAt: new Date() },
{ caracType: 'Brand', caracValue: 'Kingston', caracImg: 'assets/placeholder-1-1.webp', createdAt: new Date(), updatedAt: new Date() },
{ caracType: 'Brand', caracValue: 'Crucial', caracImg: 'assets/placeholder-1-1.webp', createdAt: new Date(), updatedAt: new Date() },
{ caracType: 'Brand', caracValue: 'Seagate', caracImg: 'assets/placeholder-1-1.webp', createdAt: new Date(), updatedAt: new Date() },
{ caracType: 'Brand', caracValue: 'Western Digital', caracImg: 'assets/placeholder-1-1.webp', createdAt: new Date(), updatedAt: new Date() }

    
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Characteristics', null, {});
  }
};