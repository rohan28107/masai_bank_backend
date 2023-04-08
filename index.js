const express = require('express');
const cors = require('cors');
// const dotenv = require('dotenv');
const { connection } = require('mongoose');
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());


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