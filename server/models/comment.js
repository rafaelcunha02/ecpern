'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      Comment.belongsTo(models.Product, { foreignKey: 'productId', onDelete: 'CASCADE' });
      Comment.belongsTo(models.User, { foreignKey: 'authorId', onDelete: 'CASCADE' });
    }

    async create() {
      await this.save();
    }

static async getCommentsFromProduct(productId) {
    return await this.findAll({
        where: { productId: productId },
        order: [['id', 'ASC']],
        include: sequelize.models.User
    });
}

    async delete() {
      await this.destroy();
    }
  }
  Comment.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    productId: DataTypes.INTEGER,
    authorId: DataTypes.INTEGER,
    content: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Comment',
    tableName: 'Comments',
    timestamps: false,
  });
  return Comment;
};