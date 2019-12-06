require('dotenv').config();
const path = require('path');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const CronJob = require('cron').CronJob;
const bodyParser = require('body-parser');

const app = express();
global.appDir = path.dirname(require.main.filename);
const dao = require('./dao').polulateData();
const Orders = require(global.appDir + '/models/orders');

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/inventory", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

const db = mongoose.connection;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));


/* Defining middleware */
app.use((req, res, next)=> {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'content-type');
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
});

app.use((req, res, next) => {
    req.headers.name = "Arvind";
    req.headers.email = "arvind@eleven01.io";
    req.headers.role = "seller";
    next();
});

app.use(function(req, res, next) {
	next();
});

/* loading all routes */
try {
    require('./routesLoder')(app);
} catch (error) {
    console.log('error', error);
}

const isListningJob = new CronJob('0 */1 * * * *', async () => {
	console.log('Started Cron At:', new Date());
    let orders = await Orders.getOdersByOrderId("OD12345");
    if(orders.cancelOrDelevered) {
        mailer.sendEmail(users.email, "Update Status", "\nYour Product Status Updated Successfully: ");
        isListningJob.stop();
    }
});

isListningJob.start();

app.listen(process.env.PORT, (request, response)=> {
	console.log(`running at port: ${process.env.PORT}`);
});
