const http = require('http');

const server = http.createServer((req, res) => {
    if(req) {
        console.log("Abhishek")
    }
});

server.listen(3000);