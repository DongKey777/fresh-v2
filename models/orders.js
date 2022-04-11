const sequelize = require('sequelize');

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
    static init(sequelize){
    return super.init(
        {
            orderNumber:{
            type : DataTypes.STRING(50),
            allowNull : false
        },
        user:{
            primaryKey : true  
        },
        orderStatus:{
            primaryKey : true
        }},
        {
            sequelize, // 옵션 설정
            timestamps: true, // timestamp(created_at, updated_at)
            underscored: false, // 디폴트 camel case를 snake case로
            modelName: "Order", // 모델명
            tableName: "orders", // 실제 db의 테이블명
            paranoid: true, // deleted_at soft delete 여부
            charset: "utf8mb4", // DB에 이모티콘 가능하게 설정
            collate: "utf8mb4_general_ci",
        }
    )
}
static associate(db) {
    db.Order.belongsTo(db.User);
    db.Order.belongsTo(db.orderStatus)
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

