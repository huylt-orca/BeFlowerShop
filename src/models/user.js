'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Cart,{foreignKey:'userId'});
      User.hasMany(models.Favorite,{foreignKey:'userId'});
      User.hasMany(models.Invoice,{foreignKey:'userId'});

    }
  }
  User.init({
    fullname: DataTypes.STRING,
    gender:DataTypes.BOOLEAN,
    birthday: DataTypes.DATE,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};