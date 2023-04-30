const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.authenticate = (req, res, next) => {
    try {
        const token = req.header('Authorization');
        const user = jwt.verify(token, '960205f013958a9fd80d704a02d18b599fd390c84f508fbcdbdc9de42a3248597f7832fdbf26ffde8c1ddb48c8e14f599aaf5bfa84ac11504cfa247d6211ba4b');
        User.findByPk(user.userId)
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
