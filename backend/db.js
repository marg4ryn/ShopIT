const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/shopit')
.then(() => console.log("Connected to MongoDB and loaded models"))
.catch(err => console.error("Connection error: ", err));

require('./models/Product');
require('./models/Category');
require('./models/Announcement');

module.exports = mongoose;
