const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config()
const app = express();


app.get("/test", (req, res) => {
  res.send("Our authentication server is working correctly");
});

app.get("/api/currentUser", (req, res) => {
  res.json({
    id: "12345",
    email: "foo@gmail.com"
  });
});

app.get("/testwithapidata", (req, res) => {
  axios.get(process.env.apiUrl + "/testapidata").then(response => {
    res.json({
      testapidata: response.data.testapidata
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
