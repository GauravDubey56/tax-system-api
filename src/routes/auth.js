const express = require('express');
const router = express.Router();
const controllers = require('../controllers/Auth')
router
    .route('/new')
    .post(controllers.registerUser)

module.exports = router;