const mongoose = require('mongoose');

// const url = 'mongodb://localhost:27017/yelab';
const url = 'mongodb+srv://harry_potter:<password>@cluster0.rivuz.mongodb.net/deadline-tracker?retryWrites=true';

mongoose.connect(url, { useNewUrlParser: true });

module.exports = mongoose;
