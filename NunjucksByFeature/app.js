const express = require('express');
const server = express();
const path = require('path');
let nunjucks = require('nunjucks');

let nunjucksEnv = nunjucks.configure([
    __dirname, // if this line gets removed, view template isn't found
    "app/views",
    //path.join(__dirname, "app", "views")
], {
    autoescape: true,
    express: server,
    watch: true
});
server.get('/module1', require('./app/module1/controllers/index'));
server.get('/module2', require('./app/module2/controllers/index'));
server.get('/module3', require('./app/module3/controllers/index'));

server.listen(3000, () => {
    console.log("App Run");
});