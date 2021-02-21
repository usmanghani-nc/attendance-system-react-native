const express = require('express');
const cors = require('cors');
const { connect, connection } = require('mongoose');

require('dotenv').config();

const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connect(
  process.env.URI,
  { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true },
  () => app.listen(port, (err) => console.log(`Port running ${port}`)),
);

connection.on('connected', () => {
  console.log('MongoDB database connection established successfully');
});

connection.on('error', (error) => {
  console.log(error, 'ERROR');
});

const registerRouter = require('./src/Routes/registerRouter');
const loginRouter = require('./src/Routes/loginRouter');
const requireAuth = require('./src/middleware/requierAuth');
const checkInRouter = require('./src/Routes/checkInRouter');

app.use(registerRouter);
app.use(loginRouter);

app.get('/', requireAuth, (req, res) => {
  const user = req.user;

  res.status(200).json({ status: 'ok', data: user });
});

app.use(checkInRouter);
