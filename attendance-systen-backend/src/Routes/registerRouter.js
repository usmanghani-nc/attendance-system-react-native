const router = require('express').Router();
const registerModel = require('../Models/RegisterModel');
const bcrypt = require('bcryptjs');

router.post('/register', async (req, res) => {
  const { fullName, email, password: playText, dateOfBirth } = req.body;

  try {
    const password = await bcrypt.hash(playText, 10);
    const user = new registerModel({ fullName, email, password, dateOfBirth });
    await user.save();
    res.status(200).json({ status: 'ok', register: true });
  } catch (error) {
    if (error.code === 11000) {
      res.json({ status: 'error', error: 'Dublicate email address', register: false });
    }

    throw error;
  }
});

module.exports = router;
