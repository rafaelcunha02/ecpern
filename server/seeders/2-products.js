'use strict';

const { v4: uuidv4 } = require('uuid');
const { userUUIDs } = require('./1-users.js');



module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', [
      {
        name: 'Apple iPhone 12',
        price: 799.99,
        category: 'Smartphone',
        brand: 'Apple',
        model: 'iPhone 12',
        tamanho: '6.1"',
        condition: 'Excellent',
        productDescription: 'The latest iPhone model from Apple',
        imageUrl: 'assets/uploads/iphone12.webp',
        sellerId: userUUIDs[0],
        isAvailable: 1
      },
      {
        name: 'Samsung Galaxy S21',
        price: 899.99,
        category: 'Smartphone',
        brand: 'Samsung',
        model: 'Galaxy S21',
        tamanho: '6.2"',
        condition: 'Good',
        productDescription: 'The latest Galaxy model from Samsung',
        imageUrl: 'assets/uploads/samsungS21.webp',
        sellerId: userUUIDs[1],
        isAvailable: 1
      },
      {
        name: 'Google Pixel 5',
        price: 699.99,
        category: 'Smartphone',
        brand: 'Google',
        model: 'Pixel 5',
        tamanho: '6.0"',
        condition: 'Average',
        productDescription: 'The latest Pixel model from Google',
        imageUrl: 'assets/uploads/pixel5.webp',
        sellerId: userUUIDs[2],
        isAvailable: 1
      },
      {
        name: 'OnePlus 9 Pro',
        price: 999.99,
        category: 'Smartphone',
        brand: 'OnePlus',
        model: '9 Pro',
        tamanho: '6.7"',
        condition: 'Bad',
        productDescription: 'The latest OnePlus model',
        imageUrl: 'assets/uploads/onePlus9.jpg',
        sellerId: userUUIDs[3],
        isAvailable: 1
      },
      {
        name: 'Xiaomi Mi 11',
        price: 799.99,
        category: 'Smartphone',
        brand: 'Xiaomi',
        model: 'Mi 11',
        tamanho: '6.81"',
        condition: 'Very Bad',
        productDescription: 'The latest Xiaomi model',
        imageUrl: 'assets/uploads/xiaomi11.jpg',
        sellerId: userUUIDs[0],
        isAvailable: 1
      },
      {
        name: 'Sony Xperia 1 III',
        price: 1099.99,
        category: 'Smartphone',
        brand: 'Sony',
        model: 'Xperia 1 III',
        tamanho: '6.5"',
        condition: 'Excellent',
        productDescription: 'The latest Sony Xperia model',
        imageUrl: 'assets/uploads/sonyXperia.jpg',
        sellerId: userUUIDs[1],
        isAvailable: 1
      },

            // CPUs
      {
        name: 'Intel Core i9',
        price: 499.99,
        category: 'CPU',
        brand: 'Intel',
        model: 'Core i9',
        tamanho: 'N/A',
        condition: 'Excellent',
        productDescription: 'High performance CPU from Intel',
        imageUrl: 'assets/uploads/i9.webp',
        sellerId: userUUIDs[0],
        isAvailable: 1
      },
      {
        name: 'AMD Ryzen 9',
        price: 449.99,
        category: 'CPU',
        brand: 'AMD',
        model: 'Ryzen 9',
        tamanho: 'N/A',
        condition: 'Excellent',
        productDescription: 'High performance CPU from AMD',
        imageUrl: 'assets/uploads/amdRyzen.webp',
        sellerId: userUUIDs[1],
        isAvailable: 1
      },
      // GPUs
      {
        name: 'NVIDIA GeForce RTX 3080',
        price: 699.99,
        category: 'GPU',
        brand: 'NVIDIA',
        model: 'RTX 3080',
        tamanho: 'N/A',
        condition: 'Excellent',
        productDescription: 'High performance GPU from NVIDIA',
        imageUrl: 'assets/uploads/rtx3080.jpg',
        sellerId: userUUIDs[0],
        isAvailable: 1
      },
      {
        name: 'AMD Radeon RX 6800 XT',
        price: 649.99,
        category: 'GPU',
        brand: 'AMD',
        model: 'RX 6800 XT',
        tamanho: 'N/A',
        condition: 'Excellent',
        productDescription: 'High performance GPU from AMD',
        imageUrl: 'assets/uploads/amdRadeon.webp',
        sellerId: userUUIDs[1],
        isAvailable: 1
      },
      // Computers
      {
        name: 'Dell XPS 15',
        price: 1599.99,
        category: 'Computer',
        brand: 'Dell',
        model: 'XPS 15',
        tamanho: 'N/A',
        condition: 'Excellent',
        productDescription: 'High performance laptop from Dell',
        imageUrl: 'assets/uploads/dellXPS.jpg',
        sellerId: userUUIDs[0],
        isAvailable: 1
      },
      {
        name: 'Apple MacBook Pro',
        price: 1899.99,
        category: 'Computer',
        brand: 'Apple',
        model: 'MacBook Pro',
        tamanho: 'N/A',
        condition: 'Excellent',
        productDescription: 'High performance laptop from Apple',
        imageUrl: 'assets/uploads/appleMacBookPro.jpeg',
        sellerId: userUUIDs[1],
        isAvailable: 1
      },

      // CPUs
      {
        name: 'Intel Core i9',
        price: 499.99,
        category: 'CPU',
        brand: 'Intel',
        model: 'Core i9',
        tamanho: 'N/A',
        condition: 'Excellent',
        productDescription: 'High performance CPU from Intel',
        imageUrl: 'assets/uploads/i9.webp',
        sellerId: userUUIDs[0],
        isAvailable: 1
      },
      {
        name: 'AMD Ryzen 9',
        price: 449.99,
        category: 'CPU',
        brand: 'AMD',
        model: 'Ryzen 9',
        tamanho: 'N/A',
        condition: 'Excellent',
        productDescription: 'High performance CPU from AMD',
        imageUrl: 'assets/uploads/amdRyzen.webp',
        sellerId: userUUIDs[1],
        isAvailable: 1
      },
      // GPUs
      {
        name: 'NVIDIA GeForce RTX 3080',
        price: 699.99,
        category: 'GPU',
        brand: 'NVIDIA',
        model: 'RTX 3080',
        tamanho: 'N/A',
        condition: 'Excellent',
        productDescription: 'High performance GPU from NVIDIA',
        imageUrl: 'assets/uploads/rtx3080.jpg',
        sellerId: userUUIDs[0],
        isAvailable: 1
      },
      {
        name: 'AMD Radeon RX 6800 XT',
        price: 649.99,
        category: 'GPU',
        brand: 'AMD',
        model: 'RX 6800 XT',
        tamanho: 'N/A',
        condition: 'Excellent',
        productDescription: 'High performance GPU from AMD',
        imageUrl: 'assets/uploads/amdRadeon.webp',
        sellerId: userUUIDs[1],
        isAvailable: 1
      },
      // Computers
      {
        name: 'Dell XPS 15',
        price: 1599.99,
        category: 'Computer',
        brand: 'Dell',
        model: 'XPS 15',
        tamanho: 'N/A',
        condition: 'Excellent',
        productDescription: 'High performance laptop from Dell',
        imageUrl: 'assets/uploads/dellXPS.jpg',
        sellerId: userUUIDs[0],
        isAvailable: 1
      },
      {
        name: 'Apple MacBook Pro',
        price: 1899.99,
        category: 'Computer',
        brand: 'Apple',
        model: 'MacBook Pro',
        tamanho: 'N/A',
        condition: 'Excellent',
        productDescription: 'High performance laptop from Apple',
        imageUrl: 'assets/uploads/appleMacBookPro.jpeg',
        sellerId: userUUIDs[1],
        isAvailable: 1
      },

      {
        name: 'Apple MacBook Pro',
        price: 1899.99,
        category: 'Computer',
        brand: 'Apple',
        model: 'MacBook Pro',
        tamanho: 'N/A',
        condition: 'Excellent',
        productDescription: 'High performance laptop from Apple',
        imageUrl: 'assets/uploads/appleMacBookPro.jpeg',
        sellerId: userUUIDs[1],
        isAvailable: 1
      },
      // Mouses
      {
        name: 'Logitech MX Master 3',
        price: 99.99,
        category: 'Mouse',
        brand: 'Logitech',
        model: 'MX Master 3',
        tamanho: 'N/A',
        condition: 'Excellent',
        productDescription: 'High performance mouse from Logitech',
        imageUrl: 'assets/uploads/logitechMX.jpeg',
        sellerId: userUUIDs[0],
        isAvailable: 1
      },
      {
        name: 'Razer DeathAdder V2',
        price: 69.99,
        category: 'Mouse',
        brand: 'Razer',
        model: 'DeathAdder V2',
        tamanho: 'N/A',
        condition: 'Excellent',
        productDescription: 'High performance mouse from Razer',
        imageUrl: 'assets/uploads/RazerDeathAdderV2.webp',
        sellerId: userUUIDs[1],
        isAvailable: 1
      },
      // Keyboards
      {
        name: 'Corsair K95 RGB Platinum',
        price: 199.99,
        category: 'Keyboard',
        brand: 'Corsair',
        model: 'K95 RGB Platinum',
        tamanho: 'N/A',
        condition: 'Excellent',
        productDescription: 'High performance keyboard from Corsair',
        imageUrl: 'assets/uploads/corsair-k95-rgb-platinum-xt-featured.jpg',
        sellerId: userUUIDs[0],
        isAvailable: 1
      },
      {
        name: 'Logitech G Pro X',
        price: 129.99,
        category: 'Keyboard',
        brand: 'Logitech',
        model: 'G Pro X',
        tamanho: 'N/A',
        condition: 'Excellent',
        productDescription: 'High performance keyboard from Logitech',
        imageUrl: 'assets/uploads/Logitech-Angle-2.webp',
        sellerId: userUUIDs[1],
        isAvailable: 1
      },
      // Monitors
      {
        name: 'Dell Ultrasharp U2720Q',
        price: 579.99,
        category: 'Monitor',
        brand: 'Dell',
        model: 'Ultrasharp U2720Q',
        tamanho: '27"',
        condition: 'Excellent',
        productDescription: 'High performance monitor from Dell',
        imageUrl: 'assets/uploads/DellUltrasharpU2720Q.jpg',
        sellerId: userUUIDs[0],
        isAvailable: 1
      },
      {
        name: 'LG 27UK850-W',
        price: 449.99,
        category: 'Monitor',
        brand: 'LG',
        model: '27UK850-W',
        tamanho: '27"',
        condition: 'Excellent',
        productDescription: 'High performance monitor from LG',
        imageUrl: 'assets/uploads/LG27UK850-W.webp',
        sellerId: userUUIDs[1],
        isAvailable: 1
      },
      // RAM
      {
        name: 'Corsair Vengeance LPX 16GB',
        price: 79.99,
        category: 'RAM',
        brand: 'Corsair',
        model: 'Vengeance LPX',
        tamanho: '16GB',
        condition: 'Excellent',
        productDescription: 'High performance RAM from Corsair',
        imageUrl: 'assets/uploads/CorsairVengeanceLPX16GB.jpg',
        sellerId: userUUIDs[0],
        isAvailable: 1
      },
      {
        name: 'Kingston HyperX Fury 16GB',
        price: 74.99,
        category: 'RAM',
        brand: 'Kingston',
        model: 'HyperX Fury',
        tamanho: '16GB',
        condition: 'Excellent',
        productDescription: 'High performance RAM from Kingston',
        imageUrl: 'assets/uploads/KingstonHyperXFury16GB.jpg',
        sellerId: userUUIDs[1],
        isAvailable: 1
      },

      {
        name: 'Kingston HyperX Fury 16GB',
        price: 74.99,
        category: 'RAM',
        brand: 'Kingston',
        model: 'HyperX Fury',
        tamanho: '16GB',
        condition: 'Excellent',
        productDescription: 'High performance RAM from Kingston',
        imageUrl: 'assets/uploads/KingstonHyperXFury16GB.jpg',
        sellerId: userUUIDs[1],
        isAvailable: 1
      },
      // SSDs
      {
        name: 'Samsung 970 EVO Plus 1TB',
        price: 149.99,
        category: 'SSD',
        brand: 'Samsung',
        model: '970 EVO Plus',
        tamanho: '1TB',
        condition: 'Excellent',
        productDescription: 'High performance SSD from Samsung',
        imageUrl: 'assets/uploads/Samsung970EVOPlus1TB.jpg',
        sellerId: userUUIDs[0],
        isAvailable: 1
      },
      {
        name: 'Crucial MX500 1TB',
        price: 99.99,
        category: 'SSD',
        brand: 'Crucial',
        model: 'MX500',
        tamanho: '1TB',
        condition: 'Excellent',
        productDescription: 'High performance SSD from Crucial',
        imageUrl: 'assets/uploads/CrucialMX5001TB.webp',
        sellerId: userUUIDs[1],
        isAvailable: 1
      },
      // HDDs
      {
        name: 'Seagate BarraCuda 2TB',
        price: 54.99,
        category: 'HDD',
        brand: 'Seagate',
        model: 'BarraCuda',
        tamanho: '2TB',
        condition: 'Excellent',
        productDescription: 'High performance HDD from Seagate',
        imageUrl: 'assets/uploads/disco-rigido-35.jpg',
        sellerId: userUUIDs[0],
        isAvailable: 1
      },
      {
        name: 'Western Digital Blue 2TB',
        price: 49.99,
        category: 'HDD',
        brand: 'Western Digital',
        model: 'Blue',
        tamanho: '2TB',
        condition: 'Excellent',
        productDescription: 'High performance HDD from Western Digital',
        imageUrl: 'assets/uploads/wd_blue_6_1.jpg',
        sellerId: userUUIDs[1],
        isAvailable: 1
      },
      // Power Supplies
      {
        name: 'Corsair RM850x',
        price: 134.99,
        category: 'Power Supply',
        brand: 'Corsair',
        model: 'RM850x',
        tamanho: '850W',
        condition: 'Excellent',
        productDescription: 'High performance power supply from Corsair',
        imageUrl: 'assets/uploads/corsairRM850x.jpg',
        sellerId: userUUIDs[0],
        isAvailable: 1
      }
            
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {});
  }
};