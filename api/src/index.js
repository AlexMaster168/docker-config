const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config()
const axios = require("axios");
const app = express();

app.get("/test", (req, res) => {
    res.send("Our api server is working correctly");
});

const kittySchema = new mongoose.Schema({
    name: String
});
const Kitten = mongoose.model("Kitten", kittySchema);

app.get("/testapidata", (req, res) => {
    res.json({
        testapidata: true
    });

});

app.get("/testwithcurrentuser", (req, res) => {
    axios.get(process.env.AUTH_API_URL + "/currentUser").then(response => {
        res.json({
            testwithcurrentuser: true,
            currentUserFromAuth: response.data
        });
    });
});

async function start() {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
        })
        app.listen(process.env.PORT, () => {
            console.log(`Started api service on port ${process.env.PORT}`);
            console.log(`Our host is ${process.env.HOST}`);
        });
    } catch (e) {
        console.log(e)
    }
}

start()
