const {NewTax, Payer, Accountant, TaxDue} = require('../models')

exports.newTaxDue = async (req, res, next) => {
    try {
        const newTax = NewTax({...req.body, accountantId: req.body.accountantId})
        const taxAmt = newTax.getGrossIncome;
    } catch (err) {
        
    }
}