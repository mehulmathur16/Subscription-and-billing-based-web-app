var express = require('express');
var app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require("bcryptjs");
require('dotenv').config();

var mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {

    if (!err) {
        console.log("MongoDB connected successfully.");
    }
    else {
        console.log("Error in DB connection : ", err);
    }
})

var db = mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function (callback) {
    console.log("connection succeeded");
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.post("/register", async (req, res) => {
    await db.collection('users').insertOne(req.body);
    res.status(200).send("Registered User Successfully!");
});

app.post("/login", async (req, res) => {
    const allUsers = await db.collection('users').find({ email: req.body.email, password: req.body.password }).toArray();

    if (allUsers.length === 0) {
        res.status(200).send("User Not Found!");
    }
    else {
        res.status(200).send("User Logged In.");
    }
});

app.listen(5000, function () {
    console.log('Example app listening on port 5000!');
});