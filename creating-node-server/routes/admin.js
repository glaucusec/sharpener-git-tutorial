const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

router.get('/add-product', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'add-product.html'))
    // res.send('<form action="add-product" method="POST"><input type="text", name="title"><br><input type="text" name="size"><button type="submit">Add Product</button></form>');
});

router.post('/add-product', (req, res, next) => {
    console.log('Title: ' + req.body['title']);
    res.redirect('/');
})

module.exports = router
