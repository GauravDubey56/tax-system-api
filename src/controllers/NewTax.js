const {NewTax, Payer, Accountant, TaxDue} = require('../models')

//@ POST api/v1/tax
exports.newTaxDue = async (req, res, next) => {
    try {
        const {panId} = req.body
        console.log(req.user);
        // console.log({...req.body, accountantId: req.user.id});
        const newTax = await NewTax.prototype.newTax({...req.body, accountantId: req.user.id})
        const taxAmt = await NewTax.prototype.getGrossIncome(newTax);
        
        const taxDue  = await TaxDue.create({
            panId, accountantId: req.user.id, taxAmt
        });
        return res.status(200).json({
            success: true,
            data: taxDue
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            masg: 'Server error'
        })
    }
}
