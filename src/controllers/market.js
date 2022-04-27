const {Market} = require('../models');

// @desc add new market
// @route POST /api/v1/cmdty
// @access public

exports.addMarket= async (req, res, next) => {
    try {
        const market = await Market.create(req.body);

        return res.status(200).json({
            success: true,
            data: market
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
            console.log(err)
            return res.status(500).json({
                success: false,
                error: 'Server Error'
            });
        }
    }
}
// @desc get all markets
// @route GET /api/v1/market
// @access public
exports.getMarkets = async (req, res, next) => {
    try {
        const markets = await Market.find();
        return res.status(200).json({
            success: true,
            data: markets
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}