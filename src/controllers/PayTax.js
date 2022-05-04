const { NewTax, Payer, Accountant, TaxDue } = require('../models')

exports.getDueTaxes = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        console.log(req.user);
        const dueTaxes = await TaxDue.find({ payerId: userId });
        return res.status(200).json({
            success: true,
            data: dueTaxes
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: 'Server error'
        })
    }
}

exports.markTaxPaid = async (req, res, next) => {
    try {
        const taxId = req.body.taxId;
        console.log(req.body);
        const taxObj = await TaxDue.findById(taxId);
        console.log(taxObj);
        taxObj.status = 'PAID';
        taxObj.paidAt = Date.now();
        await taxObj.save();
        console.log(taxObj);
        return res.status(200).json({
            success: true,
            data: taxObj
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            msg: 'Server error'
        })
    }
}

