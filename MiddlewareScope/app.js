let express = require('express');
let app = express();

let middlewareForRoute1 = (req, res, next) => {
    // expected behavior: not executed when route
    // is not defined in route1
    if(req.url == "/route2"){
        console.log("MUST NOT EXECUTED");
    }
    next();
};

let route1 = express.Router();
route1.use(middlewareForRoute1);
route1.get('/route1', (req, res, next) => {
    res.send("1");
    res.end();
});

let route2 = express.Router();
route2.get('/route2', (req, res, next) => {
    res.send("2");
    res.end();
});

app.use('/', route1);
app.use('/', route2);

let port = 3000;
app.listen(port, function () {
    console.log("RUNNING");
});