var express = require('express');
var router = express.Router();
var verifyToken = require('../auth/verifyToken');
var wineService = require('../../services/wine-service');

router.get('/', verifyToken, (req, res) => {
    wineService.getWine(req.query.title, res)
});

router.get('/popular', (req, res) => {
    wineService.getPopularWine(res);
});

module.exports = router;