const Sequelize = require('sequelize');

module.exports = class Subscription extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        size: {
          type: Sequelize.STRING(30),
          allowNull: false,
        },
        start_date: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        end_date: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        shipping_method: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
        },
        deleted_fl: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        },
      },
      {
        sequelize,
        timestamp: true,
        underscored: true, // camel case -> snake case
        modelName: 'Subscription',
        tableName: 'subscriptions', // 실제 db table 명
        paranoid: true, // deleted at, soft delete 설정 여부, timestamp: true 인 경우에만 사용 가능
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_cli',
      }
    );
  }
  static associate(db) {
    db.Subscription.belongsTo(db.ProductOption, {
      foreignKey: 'product_option',
      targetKey: 'id',
    });
  }
};
