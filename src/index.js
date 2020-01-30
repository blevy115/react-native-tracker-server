require('./models/User');
const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const variables = require('../variables')

const app = express();

app.use(bodyParser.json()); // must be parsed before request handler
app.use(authRoutes);

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

app.get('/', (req, res) => {
  res.send('Hello There');
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
})
