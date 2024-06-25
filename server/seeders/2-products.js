'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', [{
      name: 'Product 1',
      price: 100.00,
      category: 'Category 1',
      brand: 'Brand 1',
      model: 'Model 1',
      tamanho: 'Tamanho 1',
      condition: 'Excellent',
      productDescription: 'This is a description for Product 1',
      imageUrl: 'http://example.com/product1.jpg',
      sellerId: 1,
      isAvailable: 1
    }, {
      name: 'Product 2',
      price: 200.00,
      category: 'Category 2',
      brand: 'Brand 2',
      model: 'Model 2',
      tamanho: 'Tamanho 2',
      condition: 'Good',
      productDescription: 'This is a description for Product 2',
      imageUrl: 'http://example.com/product2.jpg',
      sellerId: 2,
      isAvailable: 1
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {});
  }
};