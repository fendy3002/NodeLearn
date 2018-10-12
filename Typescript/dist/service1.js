"use strict";
var service2 = require("./service2");
var service1 = function () {
    return Promise.resolve(service2);
};
module.exports = service1;
