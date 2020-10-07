
var jwt = require('jsonwebtoken');
var config = require('../config');

/**
 * Return user's id from based on his jwt token
 * @param {*} req 
 * @param {*} res 
 */
function getUserId(req, res) {
    var token = req.headers['x-access-token'];

    try {
        decoded = jwt.verify(token, config.secret);
    } catch (e) {
        return res.status(401).send({ auth: false, message: 'Token authentification failed.' });
    }

    return decoded.id;
}

module.exports = getUserId