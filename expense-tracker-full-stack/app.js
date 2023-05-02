const express = require('express');
const bodyParser = require('body-parser');

const sequelize = require('./util/database');
const userRoutes = require('./routes/user');
const purchaseRoutes = require('./routes/purchase');
const premiumRoutes = require('./routes/premium');

User = require('./models/user');
Expense = require('./models/expense');
Order = require('./models/order');

const app = express();

app.use(bodyParser.json())

app.use('/user', userRoutes);
app.use('/purchase', purchaseRoutes);
app.use('/premium', premiumRoutes);

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);
 
sequelize
    .sync()
    .then(result => {
        app.listen(3000);
    })
    .catch(err => console.log(err));
