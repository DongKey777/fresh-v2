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
            }
        }, {
            sequelize,
            timestamp: true,
            underscored: true, // camel case -> snake case
            modelName: 'User', 
            tableName: 'users', // 실제 db table 명
            paranoid: true, // deleted at, soft delete 설정 여부, timestamp: true 인 경우에만 사용 가능 
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_cli'
        });
    }
    static associate(db){
        db.User.belogsToMany(db.Allergy, {through: db.UserAllergy});
        db.User.belogsTo(db.Subscruption, {targetKey: "id"});
    }
}

class UserAllergy extends Model{
    static init(sequelize, DataTypes){
        return super.init({},{
            sequelize,
            timestamp: true,
            underscored: true,
            modelName: 'UserAllergy',
            tableName: 'users_allergies',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_cli'
        });
    }
}