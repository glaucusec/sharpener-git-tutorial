const path = require('path');

const rootDir = require('../util/path');
const User = require('../models/user');

exports.getHomePage = (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'home.html'));
}

exports.postAddUser = (req, res, next) => {
    const id = req.body.id;
    const username = req.body.username;
    const phone = req.body.phone;
    const email = req.body.email;
    // Update the user data if id is present
    if (id) {
        User.update( {
            username: username,
            phone: phone,
            email: email
        }, {
            where: {
                id: id
            }
        })
        .then(result => {
            console.log("Updated User on Database");
            res.redirect('/');
        })
        .catch(err => {
            console.log(err);
        });
    // Create a new user if id is not present.
    } else {
        User.create( {
            username: username,
            phone: phone,
            email: email
        })
        .then(result => {
            console.log("Created User on Database");
            res.redirect('/');
        })
        .catch(err => {
            console.log(err);
        });
    }
}

exports.getUserData = (req, res, next) => {
    User.findAll()
        .then(users => {
            res.send(users);
            res.end();
        })
        .catch(err => {
            console.log(err);
        })
}

exports.postDeleteUser = (req, res, next) => {
    const id = req.body.id;
    User.destroy({
        where: {
            id: id
        }
    })
    .then(res.redirect('/'))
    .catch(err => console.log(err));
}