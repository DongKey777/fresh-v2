const Enum = require('enum');

const shippingMethod = new Enum(
    {
        'Normal': 1,
        'Spot': 2,
        'Dawn': 3
    }
)

module.exports = shippingMethod