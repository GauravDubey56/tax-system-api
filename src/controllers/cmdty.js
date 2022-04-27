const {Cmdty} = require('../models');

// @desc add new commodity
// @route POST /api/v1/cmdty
// @access public

exports.addCmdty = async (req, res, next) => {
    try {
        const cmdty = await Cmdty.create(req.body);

        return res.status(200).json({
            success: true,
            data: cmdty
        })
    } catch (err) {
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
            console.log(messages);
            return res.status(400).json({
                success: false,
                error: messages
            });
        } else {
            return res.status(500).json({
                success: false,
                error: 'Server Error'
            });
        }
    }
}
// @desc get all cmdty
// @route GET /api/v1/cmdty
// @access public
exports.getCmdty = async (req, res, next) => {
    try {
        const cmdtys = await Cmdty.find();
        return res.status(200).json({
            success: true,
            data: cmdtys
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}