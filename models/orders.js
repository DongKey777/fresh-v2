const Sequelize = require('sequelize');

module.exports = class OrderStatus extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        status: {
          type: Sequelize.STRING(50),
        },
      },
      {
        sequelize, // 옵션 설정
        timestamps: true, // timestamp(created_at, updated_at)
        underscored: true, // 디폴트 camel case를 snake case로
        modelName: 'OrderStatus', // 모델명
        tableName: 'orders_status', // 실제 db의 테이블명
        charset: 'utf8mb4', // DB에 이모티콘 가능하게 설정
        collate: 'utf8mb4_general_ci',
      }
    );
  }
  static associate(db) {
    db.OrderStatus.hasMany(db.Order, {
      foreignkey: 'orderStatus',
      sourcekey: 'id',
    });
  }
};

module.exports = class Order extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        orderNumber: {
          type: Sequelize.STRING(50),
          allowNull: false,
          unique: true,
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
    db.Order.belongsto(db.User, { foreignkey: 'user', sourcekey: 'id' });
    db.Order.belongsToMany(Product, { through: 'OrderItem' });
    db.Order.belongsto(db.orderStatus, {
      foreignkey: 'orderStatus',
      sourcekey: 'id',
    });
  }
};

module.exports = class OrderStatus extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        status: {
          type: Sequelize.INTEGER.UNSIGNED,
        },
      },
      {
        sequelize, // 옵션 설정
        timestamps: true, // timestamp(created_at, updated_at)
        underscored: true, // 디폴트 camel case를 snake case로
        modelName: 'OrderStatus', // 모델명
        tableName: 'orders_status', // 실제 db의 테이블명
        charset: 'utf8mb4', // DB에 이모티콘 가능하게 설정
        collate: 'utf8mb4_general_ci',
      }
    );
  }
  static associate(db) {
    db.OrderStatus.hasMany(db.Order, {
      foreignkey: 'orderStatus',
      sourcekey: 'id',
    });
  }
};

module.exports = class OrderItemStatus extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        status: {
          type: Sequelize.INTEGER.UNSIGNED,
        },
      },
      {
        sequelize, // 옵션 설정
        timestamps: true, // timestamp(created_at, updated_at)
        underscored: true, // 디폴트 camel case를 snake case로
        modelName: 'OrderItemStatus', // 모델명
        tableName: 'orders_items_status', // 실제 db의 테이블명
        charset: 'utf8mb4', // DB에 이모티콘 가능하게 설정
        collate: 'utf8mb4_general_ci',
      }
    );
  }
  static associate(db) {
    db.OrderItemStatus.hasMany(db.OrderItem, {
      foreignkey: 'orderItemStatus',
      sourcekey: 'id',
    });
  }
};

module.exports = class OrderItem extends Sequelize.Moded {
  static init(sequelize) {
    return super.init(
      {
        quantity: {
          type: Sequelize.INTEGER(50),
        },
        totalPrice: {
          type: Sequelize.INTEGER(50),
        },
        trackingNumber: {
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
  static associate(db) {
    db.OrderItem.belongsTo(db.OrderItemStatus, {
      foreignkey: 'orderItemStatus',
      sourcekey: 'id',
    });
  }
};
