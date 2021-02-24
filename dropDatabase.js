const mongoose = require('./libs/mongoose');
const async = require('async');

mongoose.connection.on('open', () => {
    const db = mongoose.connection.db;
    db.dropDatabase((err) => {
        if (err) throw err;
        mongoose.disconnect();
    });
});