const express = require('express');
const router  = express.Router();
const controllers = require('../controllers/cmdty');

router
    .route('/')
    .post(controllers.addCmdty)
    .get(controllers.getCmdty)
    
module.exports = router;