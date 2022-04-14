const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User } = require('../models/users');

const router = express.Router();

router.post('/signup', async (req, res, next) => {
  const emailRule = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  const passwordRule =
    /'^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;

  const { email, password, name } = req.body;
  if (!emailRule.test(email) && !passwordRule.test(password)) {
    return res.status(400).json({ message: 'INVALID EMAIL OR PASSWORD' });
  }
  const user = await User.findOne({ where: { email } });
  if (user) {
    return res.status(400).json({ message: 'USER ALREADY EXISTS' });
  }

  bcrypt.hash(password, 10, async(err, hashedPw) => {
    if (err) {
      return res.status(500).json({ message: 'INTERNAL SERVER ERROR' });
    }
    const user = await User.create({ email, name, password: hashedPw });
    return res.status(200).json({ message: 'SUCCESS', user: user });
  });
});

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });

  if (!user) {
    return res.status(400).json({ message: 'USER DOES NOT EXIST' });
  }

  bcrypt.compare(password, user.password, (err, result) => {
    if (!result) {
      return res.status(400).json({ message: 'INVALID PASSWORD' });
    }
    const access_token = jwt.sign(user.id, process.env.SECRET_KEY, {
      algorithm: process.env.ALGORITHM,
    });
    return res
      .status(200)
      .json({ message: 'SUCCESS', access_token: access_token });
  });
});

module.exports = router;
