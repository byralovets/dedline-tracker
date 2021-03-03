const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/yelab';

mongoose.connect(url).then(() => console.log("Connected to [" + url + "]"));

module.exports = mongoose;