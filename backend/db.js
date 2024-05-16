const mongoose = require('mongoose');

const url = 'mongodb://127.0.0.1:27017/mydb';

mongoose.connect(url)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB:', err));

module.exports = mongoose.connection;

