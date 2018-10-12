import * as types from './types';
import service3 = require('./service3');
let service2: types.Service2 = (param1) => {
    let innerPromise = (resolve, reject) => {
        return resolve({svcName2: "Service dummy"});
    }

    if(param1 == 1){
        return new Promise<types.Service3>(innerPromise);
    }
    else{
        return Promise.resolve(service3);
    }
};
export = service2;