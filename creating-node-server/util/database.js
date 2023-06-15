const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let db;

const mongoConnect = callback => {
    MongoClient.connect('mongodb+srv://abhishekbaiju:TZl4CriFAFXhAQTZ@cluster0.su1nhjr.mongodb.net')
        .then(client => {
            console.log('Connected!')
            db = client.db();
            callback();
        })
        .catch(err => {
            console.log('not working')
        })
};

const getDb = () => {
    if(db) {
        return db;
    }
    throw 'No database Found!';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
