const express = require('express');
const router = express.Router();
const bikeData = require('../services/bikeData');

router.get('/', async function (req, res, next) {
    try {
        res.json(await bikeData.getMultiple(req.query.page));
    } catch (err) {
        console.error('Error while gettin travelling data ', err.message);
        next(err);
    }
});

module.exports = router;