var express = require('express');
var app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const crypto = require("crypto")
require('dotenv').config();

const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_TEST);

var mongoose = require('mongoose');
mongoose.set('strictQuery', true);

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
app.use(bodyParser.json());
app.use(cors());

const allPlans = {
    'Mobile-Monthly': process.env.MOBILE_MONTHLY,
    'Basic-Monthly': process.env.BASIC_MONTHLY,
    'Standard-Monthly': process.env.STANDARD_MONTHLY,
    'Premium-Monthly': process.env.PREMIUM_MONTHLY,
    'Mobile-Yearly': process.env.MOBILE_YEARLY,
    'Basic-Yearly': process.env.BASIC_YEARLY,
    'Standard-Yearly': process.env.STANDARD_YEARLY,
    'Premium-Yearly': process.env.PREMIUM_YEARLY,
}

app.post("/register", async (req, res) => {
    let passwordHash = crypto.createHash('sha256').update(req.body.password).digest('hex');

    const user = {
        name: req.body.name,
        email: req.body.email,
        password: passwordHash
    }

    await db.collection('users').insertOne(user);
    res.status(200).send("Registered User Successfully!");
});

app.post("/login", async (req, res) => {
    let passwordHash = crypto.createHash('sha256').update(req.body.password).digest('hex');
    const allUsers = await db.collection('users').find({ email: req.body.email, password: passwordHash }).toArray();

    if (allUsers.length === 0) {
        res.status(200).send("User Not Found!");
    }
    else {
        res.status(200).send({ success: true, email: req.body.email });
    }
});

app.post('/sub', async (req, res) => {
    const { email, payment_method, chosen_plan, devices, price, change_plan_active } = req.body;

    const [plan_name, plan_type] = chosen_plan.split('-')

    const customer = await stripe.customers.create({
        payment_method: payment_method,
        email: email,
        invoice_settings: {
            default_payment_method: payment_method,
        },
    });

    const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        description: chosen_plan + " Subscription Creation",
        items: [{ plan: allPlans[chosen_plan] }],
        expand: ['latest_invoice.payment_intent']
    });

    console.log(subscription);

    const status = subscription['latest_invoice']['payment_intent']['status']
    const client_secret = subscription['latest_invoice']['payment_intent']['client_secret']

    var { id, current_period_start, current_period_end } = subscription;

    console.log("ID : ", id);

    const subscriptionData = {
        id,
        email,
        plan_name,
        plan_type,
        devices,
        price,
        'start_date': current_period_start,
        'end_date': current_period_end,
    }

    if (change_plan_active === true) {
        const userPlanDetails = await db.collection('subscriptions').find({ email }).toArray();
        const { id } = userPlanDetails[0];

        await stripe.subscriptions.del(id);
        await db.collection('subscriptions').deleteMany({ email: email });
    }

    if (status === 'succeeded') {
        await db.collection('subscriptions').insertOne(subscriptionData);
    }

    res.json({ 'client_secret': client_secret, 'status': status });
})

app.post('/currentUserPlanDetails', async (req, res) => {
    const { email } = req.body;

    const userPlanDetails = await db.collection('subscriptions').find({ email }).toArray();

    res.status(200).send({ userPlanDetails: userPlanDetails[0] });
})

app.post('/cancel-subscription', async (req, res) => {
    const { email } = req.body;

    const userPlanDetails = await db.collection('subscriptions').find({ email }).toArray();
    const { id } = userPlanDetails[0];

    await stripe.subscriptions.del(id);
    await db.collection('subscriptions').deleteMany({ email: email });

    res.status(200).send({ success: true });
})

// API to cancel all subscriptions
app.post('/cancelAllSubscriptions', async (req, res) => {
    var subscriptions = await stripe.subscriptions.list({
        limit: 20,
    });

    subscriptions = subscriptions['data'];

    for (let i = 0; i < subscriptions.length; i++) {
        const curr = subscriptions[i];
        const { id } = curr;
        await stripe.subscriptions.del(id);
    }

    res.status(200).send({ success: true, subscriptions: subscriptions });
})

app.get('/getTableData', async (req, res) => {
    const tableData = await db.collection('plans').find({}).toArray();
    res.status(200).send({ tableData });
})

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.listen(5000, function () {
    console.log('Example app listening on port 5000!');
});