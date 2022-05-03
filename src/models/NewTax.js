const mongoose = require('mongoose');
const TaxDue = require('./TaxDue')
const NewTaxSchema = new mongoose.Schema({
    basicPay: {
        type: Number,
        required: [true, 'enter basic pay']
    },
    hra: {
        type: Number
    },
    lta: {
        type: Number
    },
    stdDedcuction: {
        type: Number
    },
    investment: {
        type: Number
    },
    interest: {
        type: Number
    },
    insurance: {
        type: Number
    },
    nps: {
        type: Number
    },
    otherIncome: {
        type: Number
    },
    panId: {
        type: String
    },
    accountantId: {
        type: String
    }
})

const NewTax = mongoose.model('NewTax', NewTaxSchema);


NewTax.prototype.newTax = async function (obj) {
    const newTaxObj = NewTax.create({
        payerId: obj.payerId,
        accountantId: obj.accountantId,
        basicPay: obj.basicPay,
        hra: (obj.hra === undefined ? 0 : obj.hra),
        lta: (obj.lta === undefined ? 0 : obj.lta),
        stdDedcuction: (obj.stdDedcuction === undefined ? 0 : obj.stdDedcuction),
        interest: (obj.interest === undefined ? 0 : obj.interest),
        insurance: (obj.insurance === undefined ? 0 : obj.insurance),
        investment: (obj.investment === undefined ? 0 : obj.investment),
        nps: (obj.nps === undefined ? 0 : obj.nps),
        otherIncome: (obj.otherIncome === undefined ? 0 : obj.otherIncome)
    })
    return newTaxObj;
}
NewTax.prototype.getGrossIncome = function (obj) {

    const grossIncome = obj.basicPay + obj.otherIncome - (obj.hra + obj.lta + obj.stdDedcuction + obj.interest + obj.insurance + obj.investment + obj.nps);
    console.log(grossIncome);
    return grossIncome;
}
module.exports = NewTax;