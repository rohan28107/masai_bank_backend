const express = require('express');
const cors = require('cors');
const { connection } = require('./db');
// const dotenv = require('dotenv');
require("dotenv").config();
const { AccountModel } = require('./models/Account.model');

const app = express();

app.use(express.json());
app.use(cors());


// openAccount
app.post('/openaccount', async(req, res) => {
    const payload = req.body;
    // const account = new AccountModel(req.body);
    try {
        const account = new AccountModel(payload);
        await account.save();
        // const result = await account.save();
        // res.send(result);
        res.send("Account created");
    } catch (error) {
        res.status(404).send(error.message);        
    }
});


// updateKYC
app.put('/updatekyc/:accountId', async(req, res) => {
    try {
        const account = await AccountModel.findByIdAndUpdate(req.params.accountId, req.body, { new: true });
        res.send(account);
    } catch (error) {
        res.status(404).send(error); 
    }
});

// depositMoney
app.put('/depositmoney/:accountId', async(req, res) => {
    try {
        const account = await AccountModel.findByIdAndUpdate(req.params.accountId, { $inc: {balance: req.body.amount }, $push: { ledger: { type: 'Deposit', amount: req.body.amount } } }, { new: true });
        res.send(account);
    } catch (error) {
        res.status(400).send(error);
    }
});


// withdrawMoney
app.put('/withdrawmoney/:accountId', async(req, res) => {
    try {
        const account = await AccountModel.findByIdAndUpdate(req.params.accountId, { $inc: {balance: -req.body.amount }, $push: { ledger: { type: 'Withdrawal', amount: req.body.amount } } }, { new: true });
        res.send(account);
    } catch (error) {
        res.status(400).send(error);
    }
});

// transferMoney
app.post('/transfermoney/:accountId', async(req, res) => {
    try {
        const account = await AccountModel.findByIdAndUpdate(req.params.accountId, { $inc: {balance: -req.body.amount }, $push: { ledger: { type: 'Transfer', amount: req.body.amount, toName: req.body.toName, toEmail: req.body.toEmail, toPanNo: req.body.toPanNo } } }, { new: true });
        res.send(account);
    } catch (error) {
        res.status(400).send(error);
    }
});


// printStatement
app.get('/printstatement/:accountId', async (req, res) => {
    try {
        const account = await AccountModel.findById(req.params.accountId);
        const statement = `Account Details:\nName: ${account.name}\nGender : ${account.gender}\nDOB: ${account.dob}\nEmail: ${account.email}\nMobile: ${account.mobile}\nAddress: ${account.address}\nAdhar No: ${account.adharNo}\nPan No: ${account.panNo}\nBalance: ${account.balance}\n\nTransaction History:\n`;
        account.ledger.forEach((transaction) => {
            statement += `${transaction.type} of ${transaction.amount} `;
            if(transaction.type === 'Tranfer'){
                statement += `to ${transaction.toName} (${transaction.toEmail}, ${transaction.toPanNo}) `;
            }
            statement += `\n`;
        });
        res.send(statement);
    } catch (error) {
        res.send(400).send(error);
    }
});

// closeAccount
app.delete('/closeaccount/:accountId', async(req, res) => {
    try {
        const account = await AccountModel.findById(req.params.accountId);

        if(!account) {
            return res.send(404).json({ message: 'Account not found' });
        }
        await AccountModel.deleteOne({ _id: account._id });

        res.json({ message: 'Account deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: "Internal Server Error" });
    }
})


//Starting the server
app.listen(process.env.PORT, async() => {
    try{
        await connection
        console.log("connected to DB");
    }
    catch(err){
        console.log(err.message);
    }
    console.log("Server listening on port " + process.env.PORT);
})