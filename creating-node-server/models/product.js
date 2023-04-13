const fs = require('fs');
const path  = require('path')
const rootDir = require('../util/path');

const getProductsFromFile = (cb) => {
    const p = path.join(rootDir, 
        'data', 
        'products.json'
    );
    fs.readFile(p, (err, fileContent) => {
        if(err) {
            cb([])
        } else {
            cb(JSON.parse(fileContent));
        }
    });
}


module.exports = class Product {
    constructor(t) {
        this.title = t
    }

    save() {
        getProductsFromFile(products => {
            products.push(this);
            const p = path.join(rootDir, 'data', 'products.json');
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err);
            });
        });
    }

    static fetchAll(cb) {
        getProductsFromFile(cb);
    }
};


// module.exports = class Product {
//     constructor(t) {
//         this.title = t
//     }

//     fileData() {
//         const p = path.join(rootDir, 
//             'data', 
//             'products.json'
//         );
//         return new Promise((resolve, reject) => {
//             fs.readFile(p, (err, fileContent) => {
//                 if (err) {
//                     reject("")
//                 } else {
//                     resolve(fileContent);
//                 }
//             });
//         });
//     }

//     async save() {
//         try {
//             const fileContent = await this.fileData(); // wait for the Promise to be resolved
//             let products = [];
//             if (fileContent !== "") { 
//                 products = JSON.parse(fileContent);
//             }
//             products.push(this);
//             const p = path.join(rootDir, 'data', 'products.json');
//             fs.writeFile(p, JSON.stringify(products), (err) => {
//                 if (err) { console.log(err);}
//             });
//         } catch (err) {
//             console.log(err);
//         }
//     }
    

//     static fetchAll(cb) {
//         const p = path.join(rootDir, 
//             'data', 
//             'products.json'
//         );
//         fs.readFile(p, (err, fileContent) => {
//             if (err) {
//                 cb([]);
//             }
//             cb(JSON.parse(fileContent));
//         });
//     }
// }