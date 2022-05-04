const {NewTax, Payer, Accountant, TaxDue} = require('../models')

//@ POST api/v1/tax
exports.newTaxDue = async (req, res, next) => {
    try {
        const panId = req.body.panId;
        console.log(req.user);
        console.log(req.body);
        const newTax = await NewTax.prototype.newTax({...req.body, accountantId: req.user.userId})
        const taxIncome = await NewTax.prototype.getGrossIncome(newTax);
        const taxAmt = await NewTax.prototype.getTaxAmt(taxIncome);
        const dueDate = req.body.dueDate
        console.log(taxIncome, taxAmt);
        const payer = await Payer.findOne({panId});
        console.log(payer);
        const taxDue  = await TaxDue.create({
            panId, accountantId: req.user.userId, taxIncome, taxAmt, payerId: payer.userId, dueDate
        });
        const acc = await Accountant.findOne({userId : req.user.userId});
        acc.payerIds.push(payer.userId);
        await acc.save();
        return res.status(200).json({
            success: true,
            data: taxDue
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            masg: 'Server error'
        })
    }
}


