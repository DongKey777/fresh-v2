const Sequelize = require('sequelize');

module.exports = class Cart extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {},
      {
        sequelize,
        timestamp: true,
        underscored: true, // camel case -> snake case
        modelName: 'Cart',
        tableName: 'carts', // 실제 db table 명
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_cli',
      }
    );
  }
  static associate(db) {
    db.Cart.belongsTo(db.ProductOption, {
      foreignkey: 'product',
      sourceKey: 'id',
    });
  }
};
