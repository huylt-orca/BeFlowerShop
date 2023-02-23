'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Cart.belongsTo(models.User,{foreignKey:'userId',targetKey:'id',as:'usercart'})
      Cart.belongsTo(models.User,{foreignKey:'userId'})
      Cart.belongsTo(models.Product,{foreignKey:'productId'})
    }
  }
  Cart.init({
    userId:{
      primaryKey: true,
      type: DataTypes.INTEGER      
    },
    productId:{
      primaryKey: true,
      type: DataTypes.INTEGER,
    }, 
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Cart',
    timestamps: false,
  });
  return Cart;
};