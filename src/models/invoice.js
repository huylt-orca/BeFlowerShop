'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Invoice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Invoice.hasMany(models.Product,{foreignKey:'invoiceId'});
      Invoice.belongsTo(models.User,{foreignKey:'userId'});


    }
  }
  Invoice.init({
    // id:DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    createDate: DataTypes.DATE,
    phone: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    description: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Invoice',
  });
  return Invoice;
};