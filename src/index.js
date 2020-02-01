require('./models/User');
require('./models/Track');
const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/trackRoutes');
const requireAuth = require('./middlewares/requireAuth')
const variables = require('../variables')

const app = express();

app.use(bodyParser.json()); // must be parsed before request handler
app.use(authRoutes);
app.use(trackRoutes);

const mongoUri = `mongodb+srv://${variables.mongoUser}:${variables.mongoPassword}@cluster0-aotky.mongodb.net/test?retryWrites=true&w=majority`
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to mongo instance');
})

mongoose.connection.on('error', (err) => {
  console.log('Error connecting to mongo', err);
})

app.get('/', requireAuth, (req, res) => {
  res.send(`Your email is ${req.user.email}`);
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
})
