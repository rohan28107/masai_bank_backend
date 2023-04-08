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
        type: [Date],
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
        type: Number,
        default: function (){
            return this.initialBalance;
        }
    },
    ledger: {
        type: [
            {
                type: {
                    type: String,
                    enum: ['Deposit', 'Withdrawal', 'Transfer'],
                    required: true
                },
                amount: {
                    type: Number,
                    required: true
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