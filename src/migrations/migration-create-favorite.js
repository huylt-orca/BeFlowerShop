'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Favorite', {
      userId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
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
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Favorite');
  }
};