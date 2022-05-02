const mongoose = require('mongoose');
const TaxDueSchema = new mongoose.Schema({
    taxAmt : {
        type: Number,
    },
    payerId: {
        type: String
    },
    accountantId: {
        type: String
    },
    paid: {
        type: Boolean,
        default: false
    },
    createdAt : {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date
    },
    paidAt: {
        type: Date
    }
})

const TaxDue = mongoose.model('TaxDue', TaxDueSchema);

module.exports = TaxDue;  