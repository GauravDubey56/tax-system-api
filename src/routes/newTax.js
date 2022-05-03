const express = require('express')
const router = express.Router();
const controllers = require('../controllers/NewTax')
router
    .route('/')
    .post(controllers.newTaxDue)

module.exports = router;