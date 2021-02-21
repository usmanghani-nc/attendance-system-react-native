const { Schema, model } = require('mongoose');

const registerSchema = new Schema(
  {
    fullName: String,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    dateOfBirth: String,
  },
  { collation: 'user' },
);

const Register = model('User', registerSchema);

module.exports = Register;
