// /routes/auth/authUser.js

var express = require('express');
var router = express.Router();

var User = require('../../models/user');

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../../config');

// POST create a user, requests to /api/auth/register/user
router.post('/register/user', function(req, res) {
    if (!req.body.pseudo || !req.body.password)
      return res.status(400).send("A field is missing (pseudo or password).");

    var hashedPassword = bcrypt.hashSync(req.body.password, 8);

    User.create({
        pseudo : req.body.pseudo,
        password : hashedPassword,
    },
    function (err, user) {
        if (err) {
            return res.status(400).send("Pseudo already exists.")
        }
        // create a token
        var token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });
        return res.status(200).send({ auth: true, token: token, user: { pseudo: user.pseudo } });
    }); 
});

// POST verify login for a user, requests to /api/auth/login/user
router.post('/login/user', function(req, res) {
    if (!req.body.pseudo || !req.body.password)
      return res.status(400).send("A field is missing (pseudo or password).");
    User.findOne({ pseudo: req.body.pseudo }, "_id pseudo password wineLiked preference", function (err, user) {
      if (err)
        return res.status(500).send('Internal server error.');
      if (!user)
        return res.status(400).send('User not found.');
      var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
      if (!passwordIsValid)
        return res.status(400).send("Password incorrect.");
      var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });

      has_preference = false;

      if ((user.wineLiked != undefined && user.wineLiked.length > 0) || 
      user.preference != undefined) {
        has_preference = true;
      }

      return res.status(200).send({ auth: true, token: token, user: { pseudo: user.pseudo, has_preference: has_preference }});
    });
});

module.exports = router;