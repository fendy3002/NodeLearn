import * as types from './types';
import service3 = require('./service3');
let service2: types.Service2 = (param1) => {
    let resolveService1 = Promise.resolve({svcName2: "Service dummy"});
    if(param1 == 1){
        return resolveService1;
    }
    else{
        return Promise.resolve(service3);
    }
};
export = service2;