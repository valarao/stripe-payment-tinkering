require("dotenv").config();
const cors = require("cors");
const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const uuid = require("uuid");
const app = express();

// middleware
app.use(express.json());
app.use(cors());

// routes
app.get("/", (req, res) => {
    res.send("It works!");
});

// listen
app.listen(8282, () => console.log("listening at port 8282"));