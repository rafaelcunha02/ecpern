'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.User, { foreignKey: 'sellerId' });
    }

    async saveProduct() {
      await this.save();
    }

    static async getProductById(id) {
      return await this.findByPk(id);
    }

    async deleteProduct() {
      await this.destroy();
    }

    static async getProductsFromUser(sellerId) {
      return await this.findAll({ where: { sellerId } });
    }

    static async countProductsFromUser(sellerId) {
      return await this.count({ where: { sellerId, isAvailable: 1 } });
    }

    static async getProductsFromCategory(category) {
      return await this.findAll({ where: { category, isAvailable: 1 } });
    }

    static async searchProducts(search, count) {
      return await this.findAll({ 
        where: { 
          name: { [sequelize.Op.like]: `${search}%` } 
        }, 
        limit: count 
      });
    }

    static async getAllCategories() {
      return await this.findAll({ 
        attributes: [[sequelize.fn('DISTINCT', sequelize.col('category')), 'category']]
      });
    }

    static async getAllTamanhos() {
      return await this.findAll({ 
        attributes: [[sequelize.fn('DISTINCT', sequelize.col('tamanho')), 'tamanho']]
      });
    }

    static async getAllBrands() {
      return await this.findAll({ 
        attributes: [[sequelize.fn('DISTINCT', sequelize.col('brand')), 'brand']]
      });
    }

    static async getAllModels() {
      return await this.findAll({ 
        attributes: [[sequelize.fn('DISTINCT', sequelize.col('model')), 'model']]
      });
    }

    static async getAllConditions() {
      return await this.findAll({ 
        attributes: [[sequelize.fn('DISTINCT', sequelize.col('condition')), 'condition']]
      });
    }

    static async getAllProducts() {
      return await this.findAll();
    }

    static async getAvailableProducts() {
      return await this.findAll({ 
        where: { 
          isAvailable: true 
        } 
      });
    }

  static async findNextAvailableProduct(id) {
    const products = await this.findAll({ 
      where: { 
        isAvailable: 1 
      }, 
      order: [['id', 'ASC']] 
    });

    const currentIndex = products.findIndex(product => product.id === id);
    return products[currentIndex + 1] || null;
  }

  static async findPreviousAvailableProduct(id) {
    const products = await this.findAll({ 
      where: { 
        isAvailable: 1
      }, 
      order: [['id', 'ASC']] 
    });

    const currentIndex = products.findIndex(product => product.id === id);
    return products[currentIndex - 1] || null;
  }
  }
  Product.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        len: [2, 100]
      }
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    category: DataTypes.STRING(50),
    brand: DataTypes.STRING(50),
    model: DataTypes.STRING(50),
    tamanho: DataTypes.STRING(50),
    condition: {
      type: DataTypes.ENUM,
      values: ['Excellent', 'Good', 'Average', 'Bad', 'Very Bad']
    },
    productDescription: DataTypes.TEXT,
    imageUrl: DataTypes.STRING(200),
    sellerId: DataTypes.INTEGER,
    isAvailable: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    }
  }, {
    sequelize,
    modelName: 'Product',
    tableName: 'Products',
    timestamps: true, 
  });
  return Product;
};