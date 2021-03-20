const router = require('express').Router();
const bcrypt = require('bcryptjs');
const UserModel = require('../Models/RegisterModel');
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });

    if (!user) return res.json({ status: 'error', data: 'Invalid email/password' });

    // password validation //
    const userPass = await bcrypt.compare(password, user.password);

    if (userPass) {
      // set jwt token //
      const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
        },
        process.env.JWT_SECRETE,
      );

      return res.status(200).type('applicaion/json').json({ status: 'ok', data: token });
    } else {
      res.type('applicaion/json').json({ status: 'error', data: 'Invalid email or password' });
    }
  } catch (err) {
    res.status(500).type('application/json').json({ status: 'error', Error: err });
  }
});

module.exports = router;
