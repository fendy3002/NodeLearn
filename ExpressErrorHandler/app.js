let express = require('express');
let app = express();

let route1 = express.Router();

route1.use((req, res, next) => {
    try{
        next()
    } catch(ex){
        console.log("Handled custom error", ex);
        res.end();
    }
})
route1.get('/route1', (req, res, next) => {
    throw new Error("Custom Error");
});
route1.get('/route1async', async (req, res, next) => {
    throw new Error("Custom Error");
});
route1.use(async (err, req, res, next) => {
    console.log("Handled custom error2", err);
    res.end();
})

app.use('/', route1);

let port = 3000;
app.listen(port, function () {
    console.log("RUNNING");
});