const mongoose = require('mongoose');
const AccountantSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: [true, 'Add accountant name']
    },
    username: {
        type: String, 
        required: [true, 'Add a username'],
        unique: [true, 'Username already exists']
    },
    password: {
        type: String, 
        required: [true, 'Please add a valid password']
    }
})

const Accountant = mongoose.model('Accountant', AccountantSchema);

module.exports = Accountant;