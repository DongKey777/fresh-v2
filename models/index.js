'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
// const config = require(__dirname + '/../config/config.js')[env];
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

const User = require('./users').User;
const Order = require('./orders').Order;
const OrderItem = require('./orders').OrderItem;
const Product = require('./products').Product;
const Option = require('./products').Option;
const ProductOption = require('./products').ProductOption;
const Category = require('./products').Category;
const Allergy = require('./products').Allergy;
const ProductAllergy = require('./products').ProductAllergy;
const Subscription = require('./subscriptions').Subscription;
const UserAllergy = require('./users').UserAllergy;
const Cart = require('./carts').Cart;

db.User = User;
db.Order = Order;
db.OrderItem = OrderItem;
db.Product = Product;
db.Option = Option;
db.ProductOption = ProductOption;
db.Category = Category;
db.Allergy = Allergy;
db.ProductAllergy = ProductAllergy;
db.Subscription = Subscription;
db.UserAllergy = UserAllergy;
db.Cart = Cart;

ProductOption.init(sequelize);
Subscription.init(sequelize);
Allergy.init(sequelize);
User.init(sequelize);
Order.init(sequelize);
OrderItem.init(sequelize);
Product.init(sequelize);
Option.init(sequelize);
Category.init(sequelize);
ProductAllergy.init(sequelize);
UserAllergy.init(sequelize);
Cart.init(sequelize);

User.associate(db);
Order.associate(db);
Product.associate(db);
ProductOption.associate(db);
Category.associate(db);
Allergy.associate(db);
Subscription.associate(db);

module.exports = db;
