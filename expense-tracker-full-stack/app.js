const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const sequelize = require('./util/database');
const userRoutes = require('./routes/user');
const purchaseRoutes = require('./routes/purchase');
const premiumRoutes = require('./routes/premium');
const passwordRoutes = require('./routes/password');

User = require('./models/user');
Expense = require('./models/expense');
Order = require('./models/order');
ForgotPasswordRequest = require('./models/forgot-password')
filesUploaded = require('./models/filesuploaded');

const app = express();

app.use(cors());

app.use((req, res) => {
    console.log('This is the url -> ', req.url);
})

// app.use(
//     helmet({
//         contentSecurityPolicy: false, // disable the CSP middleware
//         referrerPolicy: true,
//         crossOriginEmbedderPolicy: false,
//         crossOriginResourcePolicy: {
//             allowOrigins: ['*']
//         },
//         contentSecurityPolicy: {
//             directives: {
//                 defaultSrc: ['*'],
//                 scriptSrc: ["* data: 'unsafe-eval' 'unsafe-inline' blob:"]
//             }
//         }
//     })
// )
// app.use(helmet({
//     contentSecurityPolicy: false, // disable the CSP middleware
//     referrerPolicy: true, // disable the Referrer-Policy middleware
//     crossOriginResourcePolicy: { 
//         allowOrigins: ['*']
//      }
//   }));

// const accessLogStream = fs.createWriteStream(
//     path.join(__dirname, 'access.log'),
//     { flags: 'a' }
// );

// app.use(morgan('combined', { stream: accessLogStream}));
  

app.use('/', express.static(__dirname + '/public'));

app.use(bodyParser.json())

app.use('/user', userRoutes);
app.use('/purchase', purchaseRoutes);
app.use('/premium', premiumRoutes);
app.use('/password', passwordRoutes);

app.use((req, res) => {
    res.sendFile(path.join(__dirname, `public/login.html`))
})

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(ForgotPasswordRequest);
ForgotPasswordRequest.belongsTo(User);

User.hasMany(filesUploaded);
filesUploaded.belongsTo(User);
 
sequelize
    // .sync({force:true})
    .sync()
    .then(result => {
        app.listen(3000);
    })
    .catch(err => console.log(err));
