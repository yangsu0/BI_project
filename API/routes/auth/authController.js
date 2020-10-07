// /routes/auth/authController.js

var express = require('express');
var router = express.Router();

var User = require('../../models/user');
var verifyToken = require('./verifyToken');

router.get('/me', verifyToken, function(req, res) {
    User.findById(req.userId, { password: 0 }, function (err, user) {
        if (err)
            return res.status(500).send("Internal server error.");
        if (!user)
            return res.status(404).send("User not found.");
        else
            return res.status(200).send(user);
    });
});

router.get('/logout', verifyToken, function(req, res) {
    return res.status(200).send("User disconnected.");
});

module.exports = router;