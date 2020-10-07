var express = require('express');
var router = express.Router();
var verifyToken = require('../auth/verifyToken');
var userService = require('../../services/user-service');

router.post('/wine/liked', verifyToken, function(req, res) {
    userService.addLikedWineWithId(req.userId, req.body.data.id, res);
});

router.get('/wine/liked', verifyToken, function(req, res) {
    userService.getLikedWine(req.userId, res);
});

router.delete('/wine/liked', verifyToken, function(req, res) {
    userService.removeLikedWine(req.userId, req.body.data._id, res);
});

router.post('/preference', verifyToken, function(req, res) {
    userService.updatePreference(req.userId, req.body, res);
});

router.get('/preference', verifyToken, function(req, res) {
    userService.getUserPreference(req.userId, res);
});

router.get('/recommendation/cb', verifyToken, function(req, res) {
    userService.getUserCbRecommendation(req.userId, res);
});

router.get('/recommendation/kb', verifyToken, function(req, res) {
    userService.getUserKbRecommendation(req.userId, res);
});
module.exports = router;