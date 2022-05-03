const mongoose = require('mongoose');
const TaxDueSchema = new mongoose.Schema({
    taxAmt : {
        type: Number,
    },
    panId: {
        type: String
    },
    accountantId: {
        type: String
    },
    status: {
        type: String,
        default: 'NEW',
        enum: ['NEW', 'PAID', 'DELAYED']
    },
    // dueDate: {
    //     type: Date,
    //     required: [true, 'enter a due date']
    // },
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