const Sequelize = require('sequelize');

class Cart extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        productOptionId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'products_options',
            key: 'id',
          },
          allowNull: false,
          unique: false,
        },
        userId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'users',
            key: 'id',
          },
          allowNull: false,
          unique: false,
        },
        quantity: {
          type: Sequelize.INTEGER
        }
      },
      {
        sequelize,
        timestamps: true,
        underscored: true, // camel case -> snake case
        modelName: 'Cart',
        tableName: 'carts', // 실제 db table 명
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_cli',
      }
    );
  }
  static associate(db){
    db.Cart.belongsTo(db.User);
    db.Cart.belongsTo(db.ProductOption);
  }
}

module.exports = {
  Cart: Cart,
};
