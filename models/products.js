const sequelize = require('sequelize');

class Product extends Model {
    static init(sequelize, DataTypes){
        return super.init({
            name:{
                type: DataTypes.STRING(50),
                allowNull: false,
                unique: true
            },
            description: {
                type: DataTypes.TEXT(50),
                allowNull: true
            },
            category:{
                foreignKey: true
            }
        }, {
            sequelize,
            timestamp: true,
            underscored: true, // camel case -> snake case
            modelName: 'Product', 
            tableName: 'products', // 실제 db table 명
            paranoid: true, // deleted at, soft delete 설정 여부, timestamp: true 인 경우에만 사용 가능 
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_cli'
        }
        );
    }
    static associate(db){
        db.Product.belongsTo(db.Category, {targetKey: "id"});
        db.Product.belongsToMany(db.Option, {through: db.ProductOption});
        db.Product.belongsToMany(db.Allergy, {through: db.ProductAllergy});
    }
}

class Option extends Model {
    static init(sequelize, DataTypes){
        return super.init({
            name:{
                type: DataTypes.STRING(50),
                allowNull: false,
                unique: true
            }
        }, {
            sequelize,
            timestamp: true,
            underscored: true, // camel case -> snake case
            modelName: 'Option', 
            tableName: 'options', // 실제 db table 명
            paranoid: true, // deleted at, soft delete 설정 여부, timestamp: true 인 경우에만 사용 가능 
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_cli'
        });
    }
    static associate(db){
        db.Option.belongsToMany(db.Product, {through: db.ProductOption});
    }
}

class ProductOption extends Model {
    static init(sequelize, DataTypes){
        return super.init({
            price: {
                type: DataTypes.INTEGER.UNSIGNED
            }
        },{
            sequelize,
            timestamp: true,
            underscored: true, // camel case -> snake case
            modelName: 'ProductOption', 
            tableName: 'products_options', // 실제 db table 명
            paranoid: true, // deleted at, soft delete 설정 여부, timestamp: true 인 경우에만 사용 가능 
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_cli'
        });
    }
}

class Category extends Model{
    static init(sequelize, DataTypes){
        return super.init({
            name: {
                type: DataTypes.STRING(50)
            }
        },{
            sequelize,
            timestamp: false,
            underscored: true,
            modelName: 'Category',
            tableName: 'categories',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_cli'
        });
    }
    static associate(db){
        db.Category.hasMany(db.Product, {sourceKey: "id"});
    }
}

class Allergy extends Model{
    static init(sequelize, DataTypes){
        return super.init({
            name: {
                type: DataTypes.STRING(30)
            }
        }, {
            sequelize,
            timestamp: false,
            underscored: true, // camel case -> snake case
            modelName: 'Allergy', 
            tableName: 'allergies', // 실제 db table 명
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_cli'
        });
    }
    static associate(db){
        db.Allergy.belongsToMany(db.Product, {through: db.ProductAllergy});
        db.Allergy.belongsToMany(db.User, {through: db.UserAllergy});
    }
}

class ProductAllergy extends Model{
    static init(sequelize, DataTypes){
        return super.init({}, {
            sequelize,
            timestamp: false,
            underscored: true,
            modelName: 'ProductAllergy',
            tableName: 'products_allergies',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_cli'
        });
    }
}
