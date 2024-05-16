const mongoose = require('mongoose');

const host = process.env.MONGO_HOST || "localhost";
const port = process.env.MONGO_PORT || 27017;
const database = process.env.MONGO_DATABASE || "test";
const url = `mongodb://${host}:${port}/${database}`;

mongoose.connect(url)
  .then(() => console.log(`Connected to ${url}`))
  .catch(err => console.error(`Failed to connect to ${url}: ${err}`));

module.exports = mongoose.connection;

