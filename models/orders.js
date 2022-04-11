const sequelize = require('sequelize');

class Order extends Model {
    static init(sequelize){
    return super.init({
        {
            orderNumber:{
            type : DataTypes.STRING(50),
            allowNull : false
        },
        user:{
            primaryKey : true  
        },
        orderStatus:{
            primaryKey : true,
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
}
