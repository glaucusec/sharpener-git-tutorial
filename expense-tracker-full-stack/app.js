const express = require('express');
const bodyParser = require('body-parser');

const sequelize = require('./util/database');
const userRoutes = require('./routes/user')

User = require('./models/user');
Expense = require('./models/expense');

const app = express();

app.use(bodyParser.json())

app.use('/user', userRoutes);

User.hasMany(Expense);
Expense.belongsTo(User);
 
sequelize
    .sync()
    .then(result => {
        app.listen(3000);
    })
    .catch(err => console.log(err));
