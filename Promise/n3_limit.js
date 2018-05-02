// Promise are executed instantly
// so I do not recommend writing 
// module that immediately return Promise
// like this:

let returnPromise = (value) => {
    return new Promise((resolve, reject) => {
        resolve(value + 1);
    });
};

// I've made a utilities at https://github.com/fendy3002/QzNode
// that enable to limit number of Promise execution. Example:

let delayExecution = (value) => (resolve, reject) => {
    setTimeout(() => {
        resolve(value + 1);
    }, 100);
};

let qzNode = require("@fendy3002/qz-node").default();
let promises = [];
for(let i = 0; i < 20; i++){
    promises.push(
        qzNode.promise(delayExecution(i))
    );
}
qzNode.promise.limit({
    limit: 3
})(promises);