const Sequelize = require('sequelize');

class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        email: {
          type: Sequelize.STRING(50),
          allowNull: false,
          unique: true,
        },
        password: {
          type: Sequelize.STRING(500),
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING(50),
        },
        imageUrl: {
          type: Sequelize.STRING(2000),
          allowNull: true,
        },
        deletedFl: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        },
        subscriptionId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'subscriptions',
            key: 'id',
          },
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: true, // camel case -> snake case
        modelName: 'User',
        tableName: 'users', // 실제 db table 명
        paranoid: true, // deleted at, soft delete 설정 여부, timestamps: true 인 경우에만 사용 가능
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_cli',
      }
    );
  }
  static associate(db) {
    db.User.belongsTo(db.Subscription);
    db.User.hasMany(db.Order);
    db.User.hasMany(db.Cart);
    db.User.hasMany(db.UserAllergy);
  }
}

class UserAllergy extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        userId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'subscriptions',
            key: 'id',
          },
          unique: false,
        },
        allergyId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'subscriptions',
            key: 'id',
          },
          allowNull: false,
          unique: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: true,
        modelName: 'UserAllergy',
        tableName: 'users_allergies',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_cli',
      }
    );
  }
  static associate(db){
    db.UserAllergy.belongsTo(db.User);
    db.UserAllergy.belongsTo(db.Allergy);
  }
}

module.exports = {
  User: User,
  UserAllergy: UserAllergy,
};
