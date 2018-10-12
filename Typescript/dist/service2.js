"use strict";
var service3 = require("./service3");
var service2 = function (param1) {
    var innerPromise = function (resolve, reject) {
        return resolve({ svcName2: "Service dummy" });
    };
    if (param1 == 1) {
        return new Promise(innerPromise);
    }
    else {
        return Promise.resolve(service3);
    }
};
module.exports = service2;
