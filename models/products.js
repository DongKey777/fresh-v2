const Sequelize = require('sequelize');

class Product extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: Sequelize.STRING(50),
          allowNull: false,
          unique: true,
        },
        description: {
          type: Sequelize.TEXT(50),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamp: true,
        underscored: true, // camel case -> snake case
        modelName: 'Product',
        tableName: 'products', // 실제 db table 명
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_cli',
      }
    );
  }
  static associate(db) {
    db.Product.belongsTo(db.Category, {
      foreignKey: 'category',
      targetKey: 'id',
    });
    db.Product.belongsToMany(db.Option, { through: db.ProductOption });
    db.Product.belongsToMany(db.Allergy, { through: db.ProductAllergy });
  }
};

class Option extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: Sequelize.STRING(50),
          allowNull: false,
          unique: true,
        },
      },
      {
        sequelize,
        timestamp: true,
        underscored: true, // camel case -> snake case
        modelName: 'Option',
        tableName: 'options', // 실제 db table 명
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_cli',
      }
    );
  }
  static associate(db) {
    db.Option.belongsToMany(db.Product, { through: db.ProductOption });
  }
};

class ProductOption extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        price: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamp: true,
        underscored: true, // camel case -> snake case
        modelName: 'ProductOption',
        tableName: 'products_options', // 실제 db table 명
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_cli',
      }
    );
  }
  static associate(db) {
    db.ProductOption.hasMany(db.Subscription, {
      foreignKey: 'product_option',
      
    });
  }
};

class Category extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamp: false,
        underscored: true,
        modelName: 'Category',
        tableName: 'categories',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_cli',
      }
    );
  }
  static associate(db) {
    db.Category.hasMany(db.Product, {
      foreignKey: 'category',
      sourceKey: 'id',
    });
  }
};

class Allergy extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: Sequelize.STRING(30),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamp: false,
        underscored: true, // camel case -> snake case
        modelName: 'Allergy',
        tableName: 'allergies', // 실제 db table 명
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_cli',
      }
    );
  }
  static associate(db) {
    db.Allergy.belongsToMany(db.Product, { through: db.ProductAllergy });
    db.Allergy.belongsToMany(db.User, { through: db.UserAllergy });
  }
};

class ProductAllergy extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {},
      {
        sequelize,
        timestamp: false,
        underscored: true,
        modelName: 'ProductAllergy',
        tableName: 'products_allergies',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_cli',
      }
    );
  }
};

module.exports = {
  Product: Product,
  Option: Option,
  ProductOption: ProductOption,
  Category: Category,
  Allergy: Allergy,
  ProductAllergy: ProductAllergy,
}