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

app.post("/payment", async (req, res) => {
    try {
        const { product, token } = req.body;
        console.log("PRODUCT ", product);
        console.log("PRICE ", product.price);
        const idempontencyKey = uuid();
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        });

        const stripeResult = await stripe.charges.create({
            amount: product.price * 100,
            currency: 'cad',
            customer: customer.id,
            receipt_email: token.email,
            description: `purchase of ${product.name}`,
            shipping: {
                name: token.card.name,
                address: {
                    country: token.card.address_country
                }
            }
        }, { idempontencyKey });

        return res.send(200).json(stripeResult);
    } catch (err) {
        console.log(err);
    }
});

// listen
app.listen(8282, () => console.log("listening at port 8282"));