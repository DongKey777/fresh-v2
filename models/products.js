const sequelize = require('sequelize');

class Product extends Model {
  static init(sequelize, DataTypes) {
    return super.init({
      name: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
      },
      description: {
        type: Sequelize.TEXT(50),
        allowNull: true,
      },
      category: {
        primaryKey: true,
      },
    });
  }
}

class Option extends Model {
  static init(sequelize, DataTypes) {
    return super.init({
      name: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
      },
    });
  }
}

class ProductOption extends Model {
  static init(sequelize, DataTypes) {
    return super.init({
      option: {
        primaryKey: true,
      },
      product: {
        primaryKey: true,
      },
    });
  }

  static associate(db) {
    db.Product.belongsToMany(Option, { through: 'ProductOption' });
    db.Option.belongsToMany(Product, { through: 'ProductOption' });
  }
}
