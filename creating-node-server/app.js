const path = require('path');

const express = require('express');

const bodyParser = require('body-parser');

const app = express();

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const contactUsController = require('./controllers/contact-us');
const errorPageController = require('./controllers/error');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.get('/contact-us', contactUsController.getContactUs);

app.post('/success', contactUsController.getSuccessPage);

app.use('', errorPageController.getErrorPage);


app.listen(3000);
