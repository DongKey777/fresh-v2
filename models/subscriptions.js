const Sequelize = require('sequelize');

class Subscription extends Model{
    static init(sequelize, DataTypes){
        return super.init({
            size: {
                types: DataTypes.STRING(30)
            },
            start_date:{
                types: DataTypes.DATE
            },
            end_date:{
                types: DataTypes.DATE
            },
            shipping_method: {
                types: DataTypes.INTEGER.UNSIGNED
            }
        });
    }
    static associate(db){
        db.Subscription.hasMany(db.Product, {sourceKey: "id"});
    }
}