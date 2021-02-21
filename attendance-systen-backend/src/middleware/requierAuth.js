const jwt = require('jsonwebtoken');
const User = require('../Models/RegisterModel');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  !authorization && res.status(401).send({ status: 'error', data: 'You must login' });

  const token = authorization.replace('Bearer ', '');

  jwt.verify(token, process.env.JWT_SECRETE, async (error, paload) => {
    error && res.status(401).send({ status: 'error', data: 'You must login' });

    const { id } = paload;

    try {
      const user = await User.findById(id);

      req.user = user;
    } catch (err) {
      res.json({ status: 'error', data: err.message });
    }

    next();
  });
};
