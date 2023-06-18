const jwt = require('jsonwebtoken');
const User = require('../models/user');

require('dotenv').config();

exports.authenticate = (req, res, next) => {
    // console.log(req.header('Authorization'))
    try {
        const token = req.header('Authorization');
        const user = jwt.verify(token, process.env.TOKEN_SECRET);
        User.findById(user.userId)
            .then(user => {
                req.user = user;
                next();
            })
            .catch(err => console.log(err))
    } catch(err) {
        console.log(err);
        return res.status(401).json( { success: false } )
    }
}
