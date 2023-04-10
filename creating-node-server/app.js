const http = require('http');

const express = require('express');

const app = express();

app.use((req, res, next) => {
    console.log('In the middleware');
    next(); // allows the request to continue to next middleware in line
});

app.use((req, res, next) => {
    console.log('In another middleware!');
    res.send('{ key1: value }');
});

app.listen(3000);
