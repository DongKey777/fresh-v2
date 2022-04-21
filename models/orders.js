const Sequelize = require('sequelize');

class Order extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        orderNumber: {
          type: Sequelize.STRING(50),
          allowNull: false,
          unique: true,
        },
        orderStatusId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        userId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'user',
            key: 'id',
          },
          allowNull: false,
        },
        deletedFl: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        },
      },
      {
        sequelize, // 옵션 설정
        timestamps: true, // timestamp(created_at, updated_at)
        underscored: true, // 디폴트 camel case를 snake case로
        modelName: 'Order', // 모델명
        tableName: 'orders', // 실제 db의 테이블명
        charset: 'utf8mb4', // DB에 이모티콘 가능하게 설정
        collate: 'utf8mb4_general_ci',
      }
    );
  }
  static associate(db) {
    db.Order.belongsTo(db.User);
    db.Order.hasMany(db.OrderItem);
  }
}

class OrderItem extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        quantity: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        totalPrice: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        trackingNumber: {
          type: Sequelize.INTEGER,
        },
        oderItemStatusId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        orderId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'orders',
            key: 'id',
          },
          allowNull: false,
          unique: false,
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
  static associate(db){
    db.OrderItem.belongsTo(db.Order);
    db.OrderItem.belongsTo(db.ProductOption);
  }
}

module.exports = {
  Order: Order,
  OrderItem: OrderItem,
};
