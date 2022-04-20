const Sequelize = require('sequelize');

class Subscription extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        startDate: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        endDate: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        shippingMethod: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        deletedFl: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        },
        productOptionId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'products_options',
            key: 'id',
          },
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: true, // camel case -> snake case
        modelName: 'Subscription',
        tableName: 'subscriptions', // 실제 db table 명
        paranoid: true, // deleted at, soft delete 설정 여부, timestamps: true 인 경우에만 사용 가능
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_cli',
      }
    );
  }
  static associate(db) {
    db.Subscription.belongsTo(db.ProductOption);
    db.Subscription.hasMany(db.User);
  }
}

module.exports = {
  Subscription: Subscription,
};
