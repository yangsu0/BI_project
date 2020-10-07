// routes/user.js
var express = require('express');
var router = express.Router();

var User = require('../models/user');

// GET all users, requests to /api/user
router.get('/user', (req, res, next) => {
    User.find()
    .exec()
    .then(docs => {
        return res.status(200).send(docs);
    })
    .catch(err => {
        return res.status(400).send("User not found.");
    });
});

// DELETE a user, requests to /api/user
router.delete('/user', (req, res, next) => {
    User.remove({ email: req.body.email })
    .exec()
    .then(docs => {
        console.log(docs);
        return res.status(200).send(docs);
    })
    .catch(err => {
        console.log(err);
        return res.status(400).send("User not found.");
    });
});

module.exports = router;