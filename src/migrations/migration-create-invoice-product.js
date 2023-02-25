'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('InvoiceProducts', {
      invoiceId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull:false,
        references:{
          model:'Invoices',
          key:'id'
        }
      },
      productId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull:false,
        references:{
          model:'Products',
          key:'id'
        }
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      price:{
        type: Sequelize.DECIMAL
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('InvoiceProducts');
  }
};