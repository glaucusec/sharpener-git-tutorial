const path = require('path');

const rootDir = require('../util/path');
const Product = require('../models/product')

exports.getHomePage = (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'main.html'));
}

exports.postHomePage = (req, res, next) => {
    const name = req.body.name;
    const price = req.body.price;
    const category = req.body.category;

    Product.create( {
        name: name,
        price: price,
        category: category
    })
    .then(result => {
        console.log("Product created to database")
        res.redirect('/');
    })
    .catch((err) => {
        console.log(err);
    })
}

exports.getProducts = (req, res, next) => {
    Product.findAll()
    .then(products => {
        res.json(products);
        res.end();
    })
    .catch(err => console.log(err))
}

exports.deleteProduct = (req, res, next) => {
    const prodId = req.body.id;
    Product.destroy( {
        where: {
            id: prodId
        }
    })
    .catch(err => console.log(err));
}