const express = require('express');

const Product = require('../models/products').Product;
const router = express.Router();

router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findAll({
      where: {
        id: req.params.id,
      },
      raw: true,
    });
    res.status(200).json({ message: 'SUCCESS', result: product });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
