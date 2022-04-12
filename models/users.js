const Sequelize = require('sequelize');

class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
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
        image: {
          type: Sequelize.STRING(2000),
          allowNull: true,
        },
        deleted_fl: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        },
      },
      {
        sequelize,
        timestamp: true,
        underscored: true, // camel case -> snake case
        modelName: 'User',
        tableName: 'users', // 실제 db table 명
        paranoid: true, // deleted at, soft delete 설정 여부, timestamp: true 인 경우에만 사용 가능
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_cli',
      }
    );
  }
  static associate(db) {
    db.User.belongsToMany(db.Allergy, { through: db.UserAllergy });
    db.User.belongsTo(db.Subscription, {
      foreignKey: 'subscription',
    });
  }
};

class UserAllergy extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {},
      {
        sequelize,
        timestamp: true,
        underscored: true,
        modelName: 'UserAllergy',
        tableName: 'users_allergies',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_cli',
      }
    );
  }
};

module.exports = {
  User : User,
  UserAllergy: UserAllergy,
}