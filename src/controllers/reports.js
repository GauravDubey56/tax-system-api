const {Report, Market, Cmdty} = require('../models');


//@route POST /api/v1/report
//@dec post a record for adding cmdty and price
//@access private

exports.newRecord = async function(req, res, next){
    try {
        const obj = req.body;
        if(!(await Market.prototype.checkNameId(obj.marketID, obj.marketName) && await Cmdty.prototype.checkNameId(obj.cmdtyID, obj.cmdtyName))){
            return res.status(200).json({
                success: false,
                msg : 'Either cmdty id-name and market id-name doesnt match or is entered wrong'
            });
        }
        const checkReport = await Report.prototype.findByMktCmdty(obj.cmdtyID, obj.marketID, obj.convFactor, obj.price, obj.userID);
        if(checkReport){
            return res.status(200).json({
                success : true,
                data : {reportID : checkReport.id, isRecordNew : false}
            })
        } else {
            const report = await Report.prototype.addNewReport(obj);
            return res.status(200).json({
                success: true,
                data : {reportID : report.id, isRecordNew: true}
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            msg : 'server error'
        })
    }
}

exports.getRecordById = async function (req, res, next) {
    try {
        const report = await Report.findById(req.body.id);
        console.log(report)
        return res.status(200).json({
            success: true,
            data : report
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            msg : 'server error'
        })
    } 
}

exports.allRecords = async function(req, res, next) {
    try {
        const reports = await Report.find();
        return res.status(200).json({
            success: true,
            data : reports
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            msg : 'server error'
        })
    }
}