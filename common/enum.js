const Enum = require('enum');

const shippingMethodEnum = new Enum({
  NORMAL: 1,
  SPOT: 2,
  DAWN: 3,
});

const orderItemStatusEnum = new Enum({
  ORDERED: 1,
  SHIPPED: 2,
  ARRIVED: 3,
});
const orderStatusEnum = new Enum({
  PENDING: 1,
  CONFIRMED: 2,
  CANCELED: 3,
});

module.exports = orderStatusEnum;
module.exports = shippingMethodEnum;
