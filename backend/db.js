const mongoose = require('mongoose');
const logger = require('./logger');

mongoose.connect('mongodb://127.0.0.1:27017/shopit')
.then(() => logger.info("Connected to MongoDB successfully"))
.catch(err => logger.error("Database connection error: ", err));

require('./models/Product');
require('./models/Category');
require('./models/Announcement');

module.exports = mongoose;
