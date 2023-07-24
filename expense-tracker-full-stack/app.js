const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');

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

app.use(
    helmet({
        contentSecurityPolicy: false, // disable the CSP middleware
        referrerPolicy: true,
        crossOriginEmbedderPolicy: false,
        crossOriginResourcePolicy: {
            allowOrigins: ['*']
        },
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ['*'],
                scriptSrc: ["* data: 'unsafe-eval' 'unsafe-inline' blob:"]
            }
        }
    })
)
// app.use(helmet({
//     contentSecurityPolicy: false, // disable the CSP middleware
//     referrerPolicy: true, // disable the Referrer-Policy middleware
//     crossOriginResourcePolicy: { 
//         allowOrigins: ['*']
//      }
//   }));

const accessLogStream = fs.createWriteStream(
    path.join(__dirname, 'access.log'),
    { flags: 'a' }
);

app.use(morgan('combined', { stream: accessLogStream}));
  

app.use('/', express.static(__dirname + '/public'));

app.use(bodyParser.json())

app.use('/user', userRoutes);
app.use('/purchase', purchaseRoutes);
app.use('/premium', premiumRoutes);
app.use('/password', passwordRoutes);

app.use((req, res) => {
    res.sendFile(path.join(__dirname, `public/login.html`))
})


async function main() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/expense-tracker')
        console.log('DB connected');
        app.listen(3000);
        console.log('Listening ...')
    } catch(e) {
        console.log(e.message);
    }
}

main()