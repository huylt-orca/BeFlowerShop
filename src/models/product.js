'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category,{foreignKey:'categoryId'})
      Product.hasMany(models.Cart,{foreignKey:'productId'})
      Product.hasMany(models.Favorite,{foreignKey:'productId'});
      Product.hasMany(models.Image,{foreignKey:'productId'});
      Product.hasMany(models.InvoiceProduct,{foreignKey:'productId'});
    }
  }
  Product.init({
    // id:{
    //   type: DataTypes.INTEGER,
    //   primaryKey: true,
    // },
    name: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    price: DataTypes.DECIMAL,
    description: DataTypes.TEXT,
    status: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};