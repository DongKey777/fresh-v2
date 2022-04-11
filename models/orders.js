const { Model } = require('sequelize');
const sequelize = require('sequelize');
const { Sequelize } = require('.');

class Order extends Model {
  static init(sequelize) {
    return super.init({
      orderNumber: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
      },
      user: {
        primaryKey: true,
      },
      orderStatus: {
        primaryKey: true,
      },
    });
  }
  static associate(db) {
    db.Order.belongsto(db.User, { foreignkey: 'user', sourcekey: 'id' });
    db.Order.belongsToMany(Product, { through: 'OrderItem' });
    db.Order.belongsto(db.orderStatus, {
      foreignkey: 'orderStatus',
      sourcekey: 'id',
    });
  }
}

class OrderItem extends Model {
  static init(sequelize) {
    return super.init({
      order: {
        primaryKey: true,
      },
      product: {
        primaryKey: true,
      },
      quanity: {
        type: Sequelize.INTEGER,
      },
      totalPrice: {
        type: Sequelize.INTEGER,
      },
      orderItemStatus: {
        primaryKey: true,
      },
      trackingNumber: {
        type: Sequelize.INTEGER,
      },
    });
  }
}

class OrderStatus extends Model {
  static init(sequelize) {
    return super.init({
      status: {
        type: Sequelize.STRING(50),
      },
    });
  }
  static associate(db) {
    db.OrderStatus.hasMany(db.Order, {
      foreignkey: 'orderStatus',
      sourcekey: 'id',
    });
  }
}

class OrderItemStatus extends Model {
  static init(sequelize) {
    return super.init({
      status: {
        type: Sequelize.STRING(50),
      },
    });
  }
  static associate(db) {
    db.OrderItemStatus.hasMany(db.OrderItem, {
      foreignkey: 'orderItemStatus',
      sourcekey: 'id',
    });
  }
}
