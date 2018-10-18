import * as types from './types';
import service2 = require('./service2');
let service1: types.Service1 = () => {
    return Promise.resolve(service2)
};
//service1.svcName = "service1";
export = service1;