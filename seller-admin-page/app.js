const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const sequelize = require('./util/database');
const mainRouter = require('./routes/main');

const app = express();

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use(mainRouter);

sequelize
    .sync()
    .then(result => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    })