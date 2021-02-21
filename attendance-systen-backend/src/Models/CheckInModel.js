const { Schema, model } = require('mongoose');

const checkInSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
    deviceId: {
      type: String,
      required: true,
    },
    latitude: String,
    longitude: String,
  },
  { collation: 'checkin', timestamps: true },
);

const checkIn = model('Checkin', checkInSchema);

module.exports = checkIn;
