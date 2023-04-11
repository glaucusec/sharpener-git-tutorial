const express = require('express');

const router = express.Router();

router.get('/add-product', (req, res, next) => {
    res.send('<form action="add-product" method="POST"><input type="text", name="title"><br><input type="text" name="size"><button type="submit">Add Product</button></form>');
});

router.post('/add-product', (req, res, next) => {
    console.log('Title: ' + req.body['title']);
    console.log('Size: ' + req.body['size']);
    res.redirect('/');
})

module.exports = router
