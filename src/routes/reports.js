const express = require('express');
const router  = express.Router();
const controllers = require('../controllers')

router
    .route('/')
    .post(controllers.reports.newRecord)
    .get(controllers.reports.getRecordById)


module.exports = router;