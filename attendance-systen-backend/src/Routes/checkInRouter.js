const router = require('express').Router();
const CheckInModel = require('../Models/CheckInModel');
const requireAuth = require('../middleware/requierAuth');
const bcrypt = require('bcryptjs');
const moment = require('momnet');

router.post('/checkin', requireAuth, async (req, res) => {
  const { _id } = req.user;
  const { qrString, deviceId, latitude, longitude } = req.body;

  const hashingQr = await bcrypt.compare(process.env.QR_KEY, qrString);

  if (!hashingQr) {
    return res.status(201).json({ status: 'error', err: 'Wrong Qr code' });
  }

  try {
    const checkin = new CheckInModel({ userId: _id, deviceId, latitude, longitude });
    await checkin.save();

    res.status(200).json({ status: 'ok', data: 'Check in' });
  } catch (err) {
    res.json({ status: 'error', err });
  }
});

router.get('/checkin', requireAuth, async (req, res) => {
  const { _id } = req.user;

  const today = moment().startOf('day');

  try {
    const user = await CheckInModel.find({
      userId: _id,
      createdAt: { $gte: today.toDate(), $lte: moment(today).endOf('day').toDate() },
    });

    const userCheckIn = [...user];

    userCheckIn.splice(1, userCheckIn.length - 2);

    res.status(200).json({
      status: 'ok',
      data: userCheckIn,
    });
  } catch (err) {
    res.status(422).json({ status: 'err', err: err.message });
  }
});

module.exports = router;
