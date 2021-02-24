const cookieParser = require('cookie-parser');
const connectMongo = require('connect-mongo');
const mongoose = require('./libs/mongoose');
const createError = require('http-errors');
const session = require('express-session');
const MongoStore = connectMongo(session);
const express = require('express');
const logger = require('morgan');
const path = require('path');

const app = express();

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const deadlinesRouter = require('./routes/deadlines');
const logoutRouter = require('./routes/logout');

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/deadlines', deadlinesRouter);
app.use('/logout', logoutRouter);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use(session({
    secret: "1234567890",
    key: "sid",
    cookie: {
        path: '/',
        httpOnly: true,
        maxAge: null,
        secure: false
    },
    store: new MongoStore({mongooseConnection: mongoose.connection}),
    resave: true,
    saveUninitialized: true
}));

app.use('/public', express.static(path.resolve(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
/*app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});*/

module.exports = app;
