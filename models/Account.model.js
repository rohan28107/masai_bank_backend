const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    dob: {
        type: String,
        // type: Date,
        // default: Date.now,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    adharNo: {
        type: String,
        required: true,
        unique: true,
    },
    panNo: {
        type: String,
        required: true,
        unique: true,
    },
    balance: {
        type: String,
        // default: function (){
        //     return this.initialBalance;
        // }
    },
    ledger: {
        type: [
            {
                type: {
                    type: String,
                    enum: ['Deposit', 'Withdrawal', 'Transfer'],
                },
                amount: {
                    type: Number,
                },
                toName: {
                    type: String,
                },
                toEmail: {
                    type: String,
                },
                toPanNo: {
                    type: String,
                },
                date: {
                    type: Date,
                    default: Date.now
                }
            }
        ],
        default: []
    }
});


const AccountModel = mongoose.model('Account', accountSchema);

module.exports = {
    AccountModel
}