const request = require('request');
const url = 'http://localhost:3000/api/v1';
var uuid = require('uuid')
const randomStr = uuid.v4();
var marketID = randomStr, marketName = randomStr, marketType = "Mandi";
var cmdtyID = randomStr, cmdtyName = randomStr;
var mktID = 'm2', mktName = 'm2Name', marketName
describe('Report not generated', () => {

    var content;
    it('adding cmdty and market', async () => {
        await request.post({
            url: url + '/market',
            headers: {
                'Accept': 'application/x-www-form-urlencoded',
                'Accept-Charset': 'utf-8',
            },
            form: {
                marketID, marketName, marketType
            },
        }, (err, res, body) => {
            content = JSON.parse(res.body);
            expect(content.success).toBe(true);
            expect(content).toHaveProperty('data')
            expect(content['data'].marketID).toBe(marketID)
        })
        request.post({
            url: url + '/cmdty',
            headers: {
                'Accept': 'application/x-www-form-urlencoded',
                'Accept-Charset': 'utf-8',
            },
            form: {
                cmdtyID, cmdtyName
            }
        }, (err, res, body) => {
            content = JSON.parse(res.body);
            expect(content.success).toBe(true);
            expect(content).toHaveProperty('data')
            expect(content['data'].cmdtyID).toBe(cmdtyID)
        })
    })
    it('market or comdty id-name dont match', async () => {
        const wrongName = 'abcd';
        await request.post({
            url: url + '/report',
            headers: {
                'Accept': 'application/x-www-form-urlencoded',
                'Accept-Charset': 'utf-8',
            },
            form: {
                userID: "user-1",
                cmdtyID, cmdtyName: wrongName, marketID, marketName: wrongName, marketType,
                price: 1500,
                convFactor: 50,
                priceUnit: "Quintal",
            },
        }, (err, res, body) => {

            content = JSON.parse(res.body);
            expect(content.success).toBe(false);
            expect(content).toHaveProperty('msg')
        })
    })
})

describe('new report generated', () => {
    var price, priceUnit, convFactor, id
    it('adding new market and cmdty record', async () => {
        price = 1500, priceUnit = 'pack', convFactor = '100';
        await request.post({
            url: url + '/report',
            headers: {
                'Accept': 'application/x-www-form-urlencoded',
                'Accept-Charset': 'utf-8',
            },
            form: {
                userID: "user-1",
                cmdtyID, cmdtyName, marketID, marketName, marketType, price, convFactor, priceUnit
            },
        }, async (err, res, body) => {
            content = JSON.parse(res.body);
            expect(content.success).toBe(true);
            expect(content).toHaveProperty('data')
            expect(content['data']).toHaveProperty('reportID')
            expect(content['data'].isRecordNew).toBe(true);
        })
    })
    it('same report returned', async () => {
        await request.post({
            url: url + '/report',
            headers: {
                'Accept': 'application/x-www-form-urlencoded',
                'Accept-Charset': 'utf-8',
            },
            form: {
                userID: "user-1",
                cmdtyID, cmdtyName, marketID, marketName, marketType,
                price: 1000,
                priceUnit: 'Kg',
                convFactor: 1
            },
        }, async (err, res, body) => {
            content = JSON.parse(res.body);
            expect(content.success).toBe(true);
            expect(content).toHaveProperty('data')
            expect(content['data']).toHaveProperty('reportID')
            // expect(content['data'].isRecordNew).toBe(false);
        })
    })
})