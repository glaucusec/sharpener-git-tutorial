const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
const mongoConnect = require('./util/database').mongoConnect;

const User = require('./models/user')

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findById("648d563da1ae2b3cdfc26bce")
    .then(user => {
        req.user = user; // here we are stroing a seqelize object
        next();          // rather than a json object. so we can use
                        // methods like destory() and etc..
    })
    .catch(err => console.log(err))
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);


mongoose
.connect('mongodb+srv://abhishekbaiju:TZl4CriFAFXhAQTZ@cluster0.su1nhjr.mongodb.net/shop')
.then(result => {
    User.findOne().then(user => {
        if(!user) {
            const user = new User({
                name: 'Max', 
                email: 'max@test.com',
                cart: {
                    items: []
                }
            })
            user.save();
        }
    })
    console.log('Connected')
    app.listen(3000)
})
.catch(err => {
    console.log(err);
})