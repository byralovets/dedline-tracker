const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/yelab';

mongoose.connect(url);

module.exports = mongoose;