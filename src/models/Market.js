const mongoose = require('mongoose');

const MarketSchema = new mongoose.Schema({
    marketID: {
        type: String,
        required: [true, 'Please add a custom id'],
        unique: true
    },
    marketName : {
        type: String,
        required: [true, 'Please add a market name'],
        unique: true
    },
    marketType : {
        type: String,
        required : false
    }
})
const Market = mongoose.model('Market', MarketSchema);
Market.prototype.checkNameId = async function (marketID, marketName){
    const marketObj = await Market.findOne({
        marketID, marketName
    })
    if(marketObj) return true;
    else return false;
}
module.exports = Market