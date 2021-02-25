const express = require('express');
const router = express.Router();
const Deadline = require('../models/deadline').Deadline;
// const multer  = require("multer");

router.get('/', function (req, res) {
    if (req.session.user) {

        let userId = req.session.user._id;

        console.log("USER ID: " + userId);

        Deadline.find({ authorId: userId }, function (err, deadlines) {
            // console.log("DEADLINE ID: " + deadlines[0]);
            res.render('deadlines', {deadlines: deadlines, name: req.session.user.name});
        });
        return;
    }
    res.redirect('/auth/login');
});

router.get('/new', function (req, res) {

    if (!req.session.user) {
        res.redirect('/auth/login');
        return;
    }

    res.render('edit', {deadline: undefined, name: req.session.user.name});

    /*const name = req.body.name;
    console.log("Регистрирую имя: " + name);
    const email = req.body.email;
    console.log("Регистрирую email: " + email);
    const password = md5(req.body.password);
    console.log("Регистрирую password: " + req.body.password);
    console.log("Регистрирую hashedPassword: " + password);

    const user = new User({ name: name, email: email, password: password });

    console.log(user);

    user.save(function (err) {
        req.session.user = user;
        res.redirect('/deadlines');
    });*/

});

router.post('/new', function (req, res) {
    if (!req.session.user) {
        res.redirect('/auth/login');
        return;
    }

    const title = req.body.title;
    const authorId = req.session.user;
    const date = req.body.date;
    const description = req.body.description;
    const linkToFile = "#";

    const deadline = new Deadline({
        title: title,
        authorId: authorId,
        description: description,
        linkToFile: linkToFile,
        expirationDate: date
    });

    console.log(deadline);

    deadline.save(function (err) {
        // console.log(err);
        res.redirect('/deadlines');
    });
});

router.post('/delete', function (req, res) {

    if (!req.session.user) {
        res.redirect('/auth/login');
        return;
    }

    const deadlineId = req.body.deadlineId;

    // console.log("ID: " + deadlineId);

    Deadline.remove({_id: deadlineId}, function (err) {
        // console.log("УДАЛЕНО" + deadlineId);
    });

    res.redirect("/deadlines");
});

router.get('/update', function (req, res) {
    if (!req.session.user) {
        res.redirect('/auth/login');
        return;
    }

    const deadlineId = req.query.deadlineId;
    console.log("ID: " + deadlineId);

    Deadline.findOne({_id: deadlineId}, function (err, deadline) {
        console.log(deadline);
        res.render('edit', {deadline: deadline, name: req.session.user.name});
    });
});

router.post('/update', function (req, res) {

    if (!req.session.user) {
        res.redirect('/auth/login');
        return;
    }

    const deadlineId = req.body.deadlineId;

    console.log("ID: " + deadlineId);

    const title = req.body.title;
    // const authorId = req.session.user;
    // console.log("Айди создателя: " + authorId);
    const date = req.body.date;
    const description = req.body.description;
    const linkToFile = "#";

    Deadline.updateOne({_id: deadlineId}, {
        $set: {title: title, description: description, expirationDate: date, linkToFile: linkToFile}
    }, null, function (err) {
        res.redirect("/deadlines");
    });

    // Person.findOne({ _id: deadlineId }).then(doc => {
    //     item = doc.items.id(itemId );
    //     item["name"] = "new name";
    //     item["value"] = "new value";
    //     doc.save();
    //
    //     //sent respnse to client
    // }).catch(err => {
    //     console.log('Oh! Dark')
    // });

    // Deadline.remove({ _id: deadlineId }, function (err) {
    //     console.log("УДАЛЕНО" + deadlineId);
    // });
});

module.exports = router;
