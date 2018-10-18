"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var service1 = require("./service1");
var promise1 = service1()
    .then(function (service2) { return service2(0); })
    .then(function (service3) {
    console.log(service3);
});
var promise2 = service1()
    .then(function (service2) { return service2(1); })
    .then(function (service3) {
    console.log(service3);
});
promise1.then(function () { return promise2; });
