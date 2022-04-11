const sequelize = require('sequelize');

class User extends Model {
    static init(sequelize, DataTypes){
        return super.init({
            email:{
                type: DataTypes.STRING(50),
                allowNull: false,
                unique: true
            },
            password:{
                type: DataTypes.STRING(500),
                allowNull: false
            },
            name: {
                type: DataTypes.STRING(50)
            },
            image:{
                type: DataTypes.STRING(2000)
            },
            subscription:{
                primaryKey: true
            }
        })
    }
}

