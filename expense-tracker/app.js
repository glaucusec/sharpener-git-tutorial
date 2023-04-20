const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const sequelize = require('./util/database');
const expenseRouter = require('./routes/expense');

const app = express();

app.use(bodyParser.json());

app.use(expenseRouter);

sequelize
    .sync()
    .then(result => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    })
