const express = require('express');

const { Product, ProductOption } = require('../models/products');
const router = express.Router();

router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findAll({
      where: {
        id: req.params.id,
      },
      raw: true,
    });
    return res.status(200).json({ message: 'SUCCESS', result: product });
  } catch (error) {
    console.error(error);
  }
});

router.get('/', async (req, res, next) => {
  const category = req.query.category;
  const offset = req.query.offset;
  const limit = req.query.limit;

  const product = await ProductOption.findAll({
    where: { category },
    raw: true,
  });
  product.total = product.length;
  console.log(product);
  return res.json({ product });
});

module.exports = router;
