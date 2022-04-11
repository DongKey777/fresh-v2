const { Model } = require('sequelize');
const sequelize = require('sequelize');
const { Sequelize } = require('.');

class OrderStatus extends Model {
    static init(sequelize){
        return super.init(
           {
               status:{
                   type : DataTypes.STRING(50),
               }
           },
           {
            sequelize, // 옵션 설정
            timestamps: true, // timestamp(created_at, updated_at)
            underscored: false, // 디폴트 camel case를 snake case로
            modelName: "OrderStatus", // 모델명
            tableName: "orderStatus", // 실제 db의 테이블명
            paranoid: true, // deleted_at soft delete 여부
            charset: "utf8mb4", // DB에 이모티콘 가능하게 설정
            collate: "utf8mb4_general_ci",
        }
        )
    }
};

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
};

class OrdersItem extends Moded {
    static init(sequelize){
        return super.init(
            {
                order:{
                    primaryKey : true
                },
                product:{
                    primaryKey : true
                },
                quantity:{
                    type: DataTypes.INTEGER(50)
                },
                totalPrice:{
                    type: DataTypes.INTEGER(50)
                },
                orderItemStatus:{
                    primaryKey : true
                },
                trackingNumber:{
                    type: DataTypes.INTEGER
                }
            },
            {
                sequelize, // 옵션 설정
                timestamps: true, // timestamp(created_at, updated_at)
                underscored: false, // 디폴트 camel case를 snake case로
                modelName: "ordersItem", // 모델명
                tableName: "OrdersItems", // 실제 db의 테이블명
                paranoid: true, // deleted_at soft delete 여부
                charset: "utf8mb4", // DB에 이모티콘 가능하게 설정
                collate: "utf8mb4_general_ci",
            }
        )
    }
    static associate(db) {
        db.Order.belongsTo(db.OrdersItem);
        db.product.belongsTo()
        }
    

}

