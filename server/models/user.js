'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
    }

    getFullName() {
      return `${this.firstName} ${this.lastName}`;
    }

    async promoteToAdmin() {
      this.rank = 1;
      await this.save();
    }

    static async getUserByUsername(username) {
      return await this.findOne({ where: { username: username } });
    }

    static async getUserByEmail(email) {
      return await this.findOne({ where: { email: email } });
    }

    static async getUserById(id) {
      return await this.findByPk(id);
    }

    static async getAll() {
      return await this.findAll();
    }

    static async getUserWithPassword(username, password) {
      const user = await this.getUserByUsername(username);
      if (user && await bcrypt.compare(password, user.password)) {
        return user;
      }
      return null;
    }

    static async getUserWithPasswordEmail(email, password) {
      const user = await this.getUserByEmail(email);
      if (user && await bcrypt.compare(password, user.password)) {
        return user;
      }
      return null;
    }
  }

  User.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      validate: {
        len: [2, 50]
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: [8, 100]
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    profilePicUrl: DataTypes.STRING,
    rank: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
    timestamps: true, 
    hooks: {
      beforeCreate: async (user) => {
        const hashedPassword = await someHashingFunction(user.password);
        user.password = hashedPassword;
      }
    }
  });
  return User;
};