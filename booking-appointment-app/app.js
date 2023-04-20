const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const sequelize = require('./util/database');

const app = express();

app.use(cors());

app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'public')));

const mainRouter = require('./routes/main');

app.use(mainRouter);

sequelize
    .sync()
    .then(result => {
        // console.log(result);
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });
