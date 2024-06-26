'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Caracteristicas extends Model {
    static associate(models) {
        Caracteristicas.belongsTo(models.Product, { foreignKey: 'productId', onDelete: 'CASCADE' });
    }

    async create() {
      await this.save();
    }

    async delete() {
      await this.destroy();
    }

    static async getCaracteristicasByType(type) {
      return await this.findAll({ where: { caracType: type } });
    }

    async update() {
      await this.save();
    }

    getCaracsByType(type) {
      return this.findAll({ where: { caracType: type } });
    }

  }
  Caracteristicas.init({
    caracID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    caracType: DataTypes.STRING,
    caracValue: DataTypes.STRING,
    caracImg: DataTypes.STRING,
    productId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Caracteristicas',
    tableName: 'Characteristics',
    timestamps: true,
  });
  return Caracteristicas;
};