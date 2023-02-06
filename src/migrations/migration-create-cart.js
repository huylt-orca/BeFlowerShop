'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Carts', {
      userId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull:false,
        references:{
          model:'Users',
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
      quantity:{
        type: Sequelize.INTEGER 
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Carts');
  }
};