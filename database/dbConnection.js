require('dotenv').config();
const mongoose = require('mongoose');

// Establish MongoDB connection
mongoose.connect(process.env.MONGODB_URL ,
{
  maxConnecting: 10 ,
  maxPoolSize: 10
});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = mongoose;





