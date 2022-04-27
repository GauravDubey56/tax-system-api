const express = require('express');
const router  = express.Router();
const controllers = require('../controllers')
router
    .route('/')
    .post(controllers.market.addMarket)
    .get(controllers.market.getMarkets);


module.exports = router;