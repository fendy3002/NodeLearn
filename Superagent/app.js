let sa = require('superagent');

let jsonRpc = (resolve) => {
    console.log();
    console.log("JSONRPC");
    sa.post('https://httpbin.org/post')
        .set('Content-Type', 'application/json')
        .send(JSON.stringify(
            {"jsonrpc": "2.0", "method" : "SomeMethod", "params" : {"Data1": "Value1", "Data2": "Value2"}, "id" : 123 }
        )).then((res) => {
            console.log(res.body);
            resolve(res.body);
        }).catch((err) => {
            console.log("ERR", err);
        });
}

let rest = (resolve) => {
    console.log();
    console.log("REST");
    sa.post('https://httpbin.org/post')
        .set('Content-Type', 'application/json')
        .send({"Data1": "Value1", "Data2": "Value2"})
        .then((res) => {
            console.log(res.body);
            resolve(res.body);
        }).catch((err) => {
            console.log("ERR", err);
        });
};

new Promise(jsonRpc).then(() => new Promise(rest));