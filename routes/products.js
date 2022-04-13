var express = require('express');

const Category = require('../models/products').Category;
const Product = require('../models/products').Product;

var router = express.Router();

router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findAll({
      where: {
        id: req.params.id,
      },
      include: {
        model: Product,
      },
      raw: true,
    });
    res.status(200).json({ message: 'SUCCESS', result: product });
  } catch (error) {
    console.error(error);
    next.error(error);
  }
});

module.exports = router;
