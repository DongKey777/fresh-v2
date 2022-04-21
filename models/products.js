const Sequelize = require('sequelize');

class Product extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: Sequelize.STRING(50),
          allowNull: false,
          unique: true,
        },
        description: {
          type: Sequelize.TEXT(50),
          allowNull: true,
        },
        purchaseMethodId: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        categoryId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'categories',
            key: 'id',
          },
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: true, // camel case -> snake case
        modelName: 'Product',
        tableName: 'products', // 실제 db table 명
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_cli',
      }
    );
  }
  static associate(db) {
    db.Product.belongsTo(db.Category);
    db.Product.hasMany(db.ProductOption);
  }
}

class Option extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: Sequelize.STRING(50),
          allowNull: false,
          unique: true,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: true, // camel case -> snake case
        modelName: 'Option',
        tableName: 'options', // 실제 db table 명
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_cli',
      }
    );
  }
  static associate(db) {
    db.Option.hasMany(db.ProductOption);
  }
}

class ProductOption extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        price: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        productId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'products',
            key: 'id',
          },
          allowNull: false,
          unique: false,
        },
        optionId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'options',
            key: 'id',
          },
          allowNull: false,
          unique: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: true, // camel case -> snake case
        modelName: 'ProductOption',
        tableName: 'products_options', // 실제 db table 명
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_cli',
      }
    );
  }
  static associate(db) {
    db.ProductOption.hasMany(db.Subscription);
    db.ProductOption.belongsTo(db.Product);
    db.ProductOption.belongsTo(db.Option);
    db.ProductOption.hasMany(db.Cart);
    db.ProductOption.hasMany(db.OrderItem);
  }
}

class Category extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: true,
        modelName: 'Category',
        tableName: 'categories',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_cli',
      }
    );
  }
  static associate(db) {
    db.Category.hasMany(db.Product);
  }
}

class Allergy extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: Sequelize.STRING(30),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: true, // camel case -> snake case
        modelName: 'Allergy',
        tableName: 'allergies', // 실제 db table 명
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_cli',
      }
    );
  }
  static associate(db) {
    db.Allergy.hasMany(db.ProductAllergy);
    db.Allergy.hasMany(db.UserAllergy);
  }
}

class ProductAllergy extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        productId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'products',
            key: 'id',
          },
          allowNull: false,
          unique: false,
        },
        allergyId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'allergies',
            key: 'id',
          },
          allowNull: false,
          unique: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: true,
        modelName: 'ProductAllergy',
        tableName: 'products_allergies',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_cli',
      }
    );
  }
  static associate(db){
    db.ProductAllergy.belongsTo(db.Product);
    db.ProductAllergy.belongsTo(db.Allergy);
  }
}

module.exports = {
  Product: Product,
  Option: Option,
  ProductOption: ProductOption,
  Category: Category,
  Allergy: Allergy,
  ProductAllergy: ProductAllergy,
};
