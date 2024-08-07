'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reply extends Model {
    static associate(models) {
      Reply.belongsTo(models.Comment, { foreignKey: 'commentId', onDelete: 'CASCADE' });
      Reply.belongsTo(models.User, { foreignKey: 'authorId', onDelete: 'CASCADE' });
    }

    async create() {
      await this.save();
    }

    static async getRepliesFromComment(commentId) {
      try {
        return await this.findAll({ 
          where: { commentId: commentId },
          order: [['id', 'ASC']],
          include: sequelize.models.User
        });
      } catch (error) {
        console.error('Error fetching replies:', error);
        throw error;
      }
    }

    async delete() {
      await this.destroy();
    }

    static async countRepliesFromComment(commentId) {
      return await this.count({ where: { commentId: commentId } });
    }
  }
  Reply.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    commentId: DataTypes.INTEGER,
    authorId: DataTypes.INTEGER,
    replyText: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Reply',
    tableName: 'Replies',
    timestamps: false,
  });
  return Reply;
};