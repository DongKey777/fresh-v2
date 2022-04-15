'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.renameTable('orders_numbers', 'orders');
    await queryInterface.renameColumn('carts', 'products', 'product_id');
    await queryInterface.renameColumn('orders', 'users', 'user_id');
    await queryInterface.renameColumn('products', 'category', 'category_id');
    await queryInterface.renameColumn(
      'products_options',
      'product_option',
      'product_option_id'
    );
    await queryInterface.renameColumn(
      'subscriptions',
      'product_option',
      'product_option_id'
    );
    await queryInterface.renameColumn(
      'users',
      'subscription',
      'subscription_id'
    );
    // await queryInterface.renameColumn
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
