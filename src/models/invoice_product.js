'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class InvoiceProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      InvoiceProduct.belongsTo(models.Product,{foreignKey:'productId'});
      InvoiceProduct.belongsTo(models.Invoice,{foreignKey:'invoiceId'});
    }
  }
  InvoiceProduct.init({
    invoiceId: {
      type:  DataTypes.INTEGER,
      primaryKey: true
    },
    productId:{
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    quantity: DataTypes.INTEGER,
    price: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'InvoiceProduct',
  });
  return InvoiceProduct;
};