const { ConnectionTimedOutError } = require('sequelize');
const Sequelize = require('sequelize');

class Order extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        orderNumber: {
          type: Sequelize.STRING(50),
          allowNull: false,
          unique: true,
        },
        orderStatus: {
          type: Sequelize.INTEGER,
        },
      },
      {
        sequelize, // 옵션 설정
        timestamps: true, // timestamp(created_at, updated_at)
        underscored: true, // 디폴트 camel case를 snake case로
        modelName: 'Order', // 모델명
        tableName: 'orders_numbers', // 실제 db의 테이블명
        charset: 'utf8mb4', // DB에 이모티콘 가능하게 설정
        collate: 'utf8mb4_general_ci',
      }
    );
  }
  static associate(db) {
    db.Order.belongsTo(db.User, { foreignkey: 'user', sourcekey: 'id' });
    db.Order.belongsToMany(db.Product, { through: 'OrderItem' });
  }
};

class OrderItem extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        quantity: {
          type: Sequelize.INTEGER,
        },
        totalPrice: {
          type: Sequelize.INTEGER,
        },
        trackingNumber: {
          type: Sequelize.INTEGER,
        },
        oderItemStatus: {
          type: Sequelize.INTEGER,
        },
      },
      {
        sequelize, // 옵션 설정
        timestamps: true, // timestamp(created_at, updated_at)
        underscored: true, // 디폴트 camel case를 snake case로
        modelName: 'OrderItem', // 모델명
        tableName: 'orders_items', // 실제 db의 테이블명
        charset: 'utf8mb4', // DB에 이모티콘 가능하게 설정
        collate: 'utf8mb4_general_ci',
      }
    );
  }
};

module.exports = {
  Order: Order,
  OrderItem: OrderItem,
}