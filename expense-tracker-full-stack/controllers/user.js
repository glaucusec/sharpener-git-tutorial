const path = require('path');
const bcrypt = require('bcrypt');

const rootDir = require('../util/path');
const User = require('../models/user');

exports.getSignUpPage = (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'signup.html'));
}

exports.getLoginPage = (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'login.html'));
}

exports.postSignUpData = (req, res, next) => {
    const { name, email, password } = req.body;

    const saltrounds = 10;
    bcrypt
        .hash(password, saltrounds)
        .then(hash => {
            User.create( {
                name: name, 
                email: email, 
                password: hash
            })
            .then(result => {
                res.send(result);
            })
            .catch(err => {
                res.status(403).json({ error: 'Email is already taken' });
            })
        })
        .catch(err => console.log(err));
}

exports.postLoginData = (req, res, next) => {
    const { email, password } = req.body;

    User.findOne({
        where: {
            email: email
        }
    })
    .then(result => {
        bcrypt
            .compare(password, result.password)
            .then(passwordsMatch => {
                if(passwordsMatch) {
                    res.send("User Login Successful");
                } else {
                    res.status(401).json({ error: "Incorrect Password" });
                }
            })
            .catch(err => {
                res.status(500).json( { error: "Internal Server Error" });
            })
    })
    .catch(err => {
        res.status(403).json( {error: "User not found"});
    });
}