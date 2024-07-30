'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.Product, { foreignKey: 'productId', onDelete: 'NO ACTION' });
      Order.belongsTo(models.User, { as: 'Buyer', foreignKey: 'buyerId', onDelete: 'NO ACTION' });
      Order.belongsTo(models.User, { as: 'Seller', foreignKey: 'sellerId', onDelete: 'NO ACTION' });
    }

    static async getOrderByGroup(group) {
      return await this.findAll({ where: { orderGroup: group } });
    }

  static async getUnprocessedOrdersByBuyerId(buyerId) {
    return await this.findAll({ 
      where: { buyerId: buyerId, isProcessed: 0 },
      include: [
        { model: sequelize.models.Product },
        { model: sequelize.models.User, as: 'Seller' }
      ]
    });
  }

    static async getProcessedOrdersByBuyerId(buyerId) {
      return await this.findAll({ 
        where: { buyerId: buyerId, isProcessed: 1 },
        include: [ { model: sequelize.models.Product },
                    { model: sequelize.models.User, as: 'Seller' }
                  ]
      });
    }

    static async getProcessedOrdersBySellerId(sellerId) {
      return await this.findAll({ 
        where: { sellerId: sellerId, isProcessed: 1 },
        include: [ { model: sequelize.models.Product },
                    {model: sequelize.models.User, as: 'Buyer' }
                  ]
      });
    }

    async process() {
      this.isProcessed = 1;
      await this.save();
      const product = await sequelize.models.Product.findByPk(this.productId);
      product.isAvailable = 0;
      await product.save();
    }

    static async getOrderGroupByProductId(product) {
        const order = await this.findOne({ 
            where: { productId: product.id, isProcessed: 1 },
            attributes: ['orderGroup']
        });
        return order ? order.orderGroup : null;
    }

    static async mapProductsToOrderGroups(products) {
        const groupedProducts = {};
        for (const product of products) {
            const orderGroup = await this.getOrderGroupByProductId(product);
            if (!groupedProducts[orderGroup]) {
                groupedProducts[orderGroup] = [];
            }
            groupedProducts[orderGroup].push(product);
        }
        return groupedProducts;
    }

    static async getOrderBySellerIdAndProductId(sellerId, productId) {
        const order = await this.findOne({ 
            where: { sellerId: sellerId, productId: productId }
        });
        return order;
    }

    static async getHighestGroupValue() {
        const result = await sequelize.query('SELECT MAX(orderGroup) as maxGroup FROM Orders', { type: sequelize.QueryTypes.SELECT });
        return result[0] ? result[0].maxGroup : null;
    }

    static async getProcessedOrders() {
        return await this.findAll({ 
            where: { isProcessed: 1 },
            include: { model: sequelize.models.Product }
        });
    }

    static async getBuyerIdByGroup(group) {
        const order = await this.findOne({ 
            where: { orderGroup: group },
            attributes: ['buyerId']
        });
        return order ? order.buyerId : null;
    }
  }

  Order.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    productId: DataTypes.INTEGER,
    buyerId: DataTypes.INTEGER,
    sellerId: DataTypes.INTEGER,
    orderDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    isProcessed: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    orderGroup: DataTypes.INTEGER,
    shipping: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'Order',
    tableName: 'Orders',
    timestamps: true, 
    hooks: {
      beforeCreate: (order, options) => {
        if (order.buyerId === order.sellerId) {
          throw new Error("BuyerId and SellerId cannot be the same");
        }
      }
    }
  });

  return Order;
};