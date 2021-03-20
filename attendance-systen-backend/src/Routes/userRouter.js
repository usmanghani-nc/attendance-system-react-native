const router = require('express').Router();
const requireAuth = require('../middleware/requierAuth');

router.get('/checkUser', requireAuth, async (req, res) => {
  const { email, fullName } = req.user;

  res.type('applicaion/json').json({ status: 'ok', data: { email, fullName } });
});

module.exports = router;
