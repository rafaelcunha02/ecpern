'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      category: Sequelize.STRING(50),
      brand: Sequelize.STRING(50),
      model: Sequelize.STRING(50),
      tamanho: Sequelize.STRING(50),
      condition: {
        type: Sequelize.ENUM('Excellent', 'Good', 'Average', 'Bad', 'Very Bad')
      },
      productDescription: Sequelize.TEXT,
      imageUrl: Sequelize.STRING(200),
      sellerId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'NO ACTION',
        onDelete: 'SET NULL',
      },
      isAvailable: {
        type: Sequelize.INTEGER,
        defaultValue: 1
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()')
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Products');
  }
};