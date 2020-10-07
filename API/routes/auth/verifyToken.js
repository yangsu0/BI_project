// /routes/auth/verifyToken.js
var jwt = require('jsonwebtoken');
var config = require('../../config');

function verifyToken(req, res, next) {
  var token = req.headers['x-access-token'];
  if (!token)
    return res.status(400).send({ auth: false, message: 'Token not provided.' });
  jwt.verify(token, config.secret, function(err, decoded) {
    if (err)
        return res.status(500).send({ auth: false, message: 'Token authentification failed.' });
    // if everything good, save to request for use in other routes
    req.userId = decoded.id;
    next();
  });
}


module.exports = verifyToken