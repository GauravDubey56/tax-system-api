const express = require('express');
const router = express.Router();
const controllers = require('../controllers/Auth')
router
    .route('/new')
    .post(controllers.registerUser)

router
    .route('/login')
    .post(controllers.loginUser)
module.exports = router;