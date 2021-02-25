const express = require('express');
const router = express.Router();
const User = require('../models/user').User;
const md5 = require('md5');

router.get('/login', function (req, res, next) {
    if (req.session.user) {
        res.redirect('/deadlines');
        return;
    }

    res.render('login');
});

router.post('/login', function (req, res, next) {

    if (req.session.user) {
        res.redirect('/deadlines');
        return;
    }

    const email = req.body.email;
    const password = md5(req.body.password);

    // console.log("email: " + email);
    // console.log("password: " + password);

    console.log("Получил email: " + email);
    console.log("Получил password: " + req.body.password);
    console.log("Получил hashedPassword: " + password);

    if (!(email && password)) throw Error;

    User.findOne({email: email}, function (err, user) {
        if (user) {
            if (user.checkPassword(password)) {
                req.session.user = user;
                res.redirect('/deadlines');
                return;
            }
        }
        res.redirect('/auth/login');
    });
});

router.get('/register', function (req, res, next) {
    if (req.session.user) {
        res.redirect('/deadlines');
        return;
    }

    res.render('register');
});

router.post('/register', function (req, res, next) {
    if (req.session.user) {
        res.redirect('/deadlines');
        return;
    }

    const name = req.body.name;
    console.log("Регистрирую имя: " + name);
    const email = req.body.email;
    console.log("Регистрирую email: " + email);
    const password = md5(req.body.password);
    console.log("Регистрирую password: " + req.body.password);
    console.log("Регистрирую hashedPassword: " + password);

    const user = new User({name: name, email: email, password: password});

    console.log(user);

    user.save(function (err) {
        console.log(err);
        req.session.user = user;
        res.redirect('/deadlines');
    });
});

module.exports = router;