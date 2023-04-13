const path = require('path');
const rootDir = require('../util/path');

const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'add-product.html'))
    // res.send('<form action="add-product" method="POST"><input type="text", name="title"><br><input type="text" name="size"><button type="submit">Add Product</button></form>');
};

exports.postAddProduct = (req, res, next) => {
    const product = new Product(req.body.title);
    product.save();

    res.redirect('/');
};

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        console.log(products);
    });
    
    res.sendFile(path.join(rootDir, 'views', 'shop.html'))
};