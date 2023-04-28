const path = require('path');

const rootDir = require('../util/path');
const User = require('../models/user');

exports.getSignUpPage = (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'signup.html'));
}

exports.postSignUpData = (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    User.create( {
        name: name, 
        email: email, 
        password: password
    })
    .then(result => {
        res.send(result);
    })
    .catch(err => {
        res.status(403).json({error: "Email is already taken"});
    });
}