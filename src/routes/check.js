const express = require('express');
const router = express.Router();
router.get('/', async (req, res, next) => {
    res.send({
        msg: "use /api/v1/{resource} where resource can be market, cmdty, report"
    })
})
module.exports = router;
