const express = require('express');
const router = express.Router();
const Deadline = require('../models/deadline').Deadline;

router.get('/', function (req, res) {
    if (req.session.user) {

        let userId = req.session.user._id;

        console.log("USER ID: " + userId);

        Deadline.find({authorId: userId}, function (err, deadlines) {
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
});

router.post('/new', function (req, res) {
    if (!req.session.user) {
        res.redirect('/auth/login');
        return;
    }

    const title = req.body.title;
    const authorId = req.session.user;
    const date = req.body.date;
    const description = req.body.description.replaceAll("\r\n", "<br>");
    const linkToFile = "#";

    let creationDateFormatted = "";
    let creationDate = new Date();

    creationDateFormatted += ("00" + creationDate.getDate()).slice(-2)
        + "." + ("00" + creationDate.getMonth() + 1).slice(-2)
        + "." + ("0000" + creationDate.getFullYear()).slice(-4);

    const deadline = new Deadline({
        title: title,
        authorId: authorId,
        description: description,
        linkToFile: linkToFile,
        creationDate: creationDateFormatted,
        expirationDate: date
    });

    console.log(deadline);

    deadline.save(function (err) {
        res.redirect('/deadlines');
    });
});

router.post('/delete', function (req, res) {

    if (!req.session.user) {
        res.redirect('/auth/login');
        return;
    }

    const deadlineId = req.body.deadlineId;

    Deadline.remove({_id: deadlineId}, function (err) {
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
        deadline.description = deadline.description.replaceAll("<br>", "\r\n");
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
    const date = req.body.date;
    const description = req.body.description.replaceAll("\r\n", "<br>");
    const linkToFile = "#";

    Deadline.updateOne({_id: deadlineId}, {
        $set: {title: title, description: description, expirationDate: date, linkToFile: linkToFile}
    }, null, function (err) {
        res.redirect("/deadlines");
    });
});

module.exports = router;
