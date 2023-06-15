const getDb = require('../util/database').getDb;

class Product {
  constructor(title, price, description, imageUrl) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
  }
  save() {
    const db = getDb();
    return db.collection('products')
      .insertOne(this)
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
  }
}


module.exports = Product;



// const db = require('../util/database');


// module.exports = class Product {
//   constructor(id, title, imageUrl, description, price) {
//     this.id = id;
//     this.title = title;
//     this.imageUrl = imageUrl;
//     this.description = description;
//     this.price = price;
//   }

//   save() {
//     return db.execute(
//       'INSERT INTO products (title, price, imageUrl, description) VALUES (?, ?, ?, ?)', 
//       [this.title, this.price, this.imageUrl, this.description]
//     );
//   }

//   static fetchAll() {
//     return db.execute('SELECT * FROM products')
//   }

//   static findById(id) {
//     return db.execute('SELECT * FROM products WHERE products.id = ?', [id]);
//   }

//   static deleteById(id) {
//     return db.execute('DELETE FROM products WHERE products.id = ?' ,[id]);
//   }

// };
