const router = require('express').Router();
const User = require('../models/User');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

//REGISTER

router.post('/register', async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
  });

  try {
    const saveUser = await newUser.save();
    res.status(201).json(saveUser);
    console.log('saveUser', saveUser);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

//LOGIN

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    !user && res.status(401).json('Wrong credentials');

    const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
    const orgPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    orgPassword !== req.body.password && res.status(401).json('Wrong credentials');

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: '3d' },
    );

    const { password, ...rest } = user._doc;

    res.status(200).json({ ...rest, accessToken });
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

module.exports = router;
