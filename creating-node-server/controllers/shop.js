const Product = require('../models/product');
// const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
  .then(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  })
  .catch(err => {
    console.log(err);
  });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  // Product.findAll({
  //   where: {
  //     id: prodId
  //   }
  // })
  //   .then(product => {
  //     res.render('shop/product-detail', {
  //       product: product[0],
  //       pageTitle: product.title,
  //       path: '/products'
  //     });
  //   })
  //   .catch((err) => console.log(err));
  Product.findById(prodId)
  .then(product => {
    res.render('shop/product-detail', {
      product: product,
      pageTitle: product.title,
      path: '/products'
    });
  })
  .catch(err => console.log(err))
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
  .then(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  })
  .catch(err => {
    console.log(err);
  });
};

exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then(products => {
      res.render('shop/cart', {
          path: '/cart',
          pageTitle: 'Your Cart',
          products: products
        });
      })
    .catch(err => console.log(err));
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
  .then(product => {
    req.user.addToCart(product);
  })
  .then(result => {
    res.redirect('/cart')
    console.log(result);
  })
  .catch(err => console.log(err));
};

exports.postDeleteCart = (req, res, next) => {
  prodId = req.body.productId;
  req.user.deleteCart(prodId)
  .then(result => {
    res.redirect('/cart')
  })
  .catch(err => {
    console.log(err);
  })
  // req.user.getCart()
  //   .then(cart => {
  //     return cart.getProducts( { where: { id: prodId } });
  //   })
  //   .then(products => {
  //     const product = products[0];
  //     return product.cartItem.destroy();
  //   })
  //   .then(result => {
  //     res.redirect('/cart');
  //   })
  //   .catch(err => console.log(err))
}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};


