const req = require('express/lib/request');
const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
    cmdtyID: {
        type: String,
        required: [true, 'Add a cmdtyID']
    },
    cmdtyName: {
        type: String,
        required: [true, 'Add a cmdty name']
    },
    marketID: {
        type: String,
        required: [true, 'Add a marketID']
    },
    marketName: {
        type: String,
        required: [true, 'Add a market name']
    },
    users: {
        type: Array,
        default: []
    },
    price: {
        type: Number,
        default: 0
    },
    timestamp: {
        type: Date,
        default: Date.now()
    }
})
const Report = mongoose.model('Report', ReportSchema);
Report.prototype.findByMktCmdty = async function (cmdtyID, marketID, convFactor, price, userID) {
    try {
        const report = await mongoose.model('Report').findOne({
            marketID, cmdtyID
        });
        const basePrice = price / convFactor;
        if (report) {
            report.price = ((report.price * report.users.length) + basePrice) / (report.users.length + 1);
            report.users.push(userID)
            report.timestamp = Date.now();
            await report.save();
            return report;
        } else {
            return null;
        }
    } catch (error) {
        console.log(error);
    }
}

Report.prototype.addNewReport = async function (reqBody) {
    try {
        const basePrice = reqBody.price / reqBody.convFactor;
        const report = await mongoose.model('Report').create({
            marketID: reqBody.marketID,
            marketName: reqBody.marketName,
            cmdtyID: reqBody.cmdtyID,
            cmdtyName: reqBody.cmdtyName,
            users: [reqBody.userID],
            price: basePrice
        })
        return report;
    } catch (error) {
        console.log(error);
    }
}

module.exports = Report;