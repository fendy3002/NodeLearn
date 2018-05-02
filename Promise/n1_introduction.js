// In NodeJs, it is common to find callback functions due to async nature. 
// Example:

let operation1 = (value, callback) => {
    callback(value + 1);
}
let operation2 = (value, callback) => {
    callback(value + 2);
}
let operation3 = (value, callback) => {
    callback(value + 3);
}


// If you want the execution order to be operation1 -> operation2 -> operation3,
// you need to write it like this:
operation1(0, (result1) => {
    operation2(result1, (result2) => {
        operation3(result2, (result3) => {
            console.log("by nesting", result3);
        });
    });
});
// Which is hard to maintain and can become long


// Promise help to manage the flow of callback
new Promise((resolve, reject) => {
    operation1(0, (result1) => { resolve(result1); });
}).then((result1) => {
    return new Promise((resolve, reject) => {
        operation2(result1, (result2) => { resolve(result2); });
    });
}).then((result2) => {
    return new Promise((resolve, reject) => {
        operation3(result2, (result3) => { resolve(result3); });
    });
}).then((result3) => {
    console.log("by promise", result3);
});


// Make it easier to branch
let promiseOperation1 = new Promise((resolve, reject) => {
    operation1(0, (result1) => { resolve(result1); });
});
let promiseOperation1To2 = promiseOperation1.then((result1) => {
    return new Promise((resolve, reject) => {
        operation2(result1, (result2) => { resolve(result2); });
    });
}).then((result2) => {
    console.log("1 -> 2: " + result2);
});
let promiseOperation1To3 = promiseOperation1.then((result1) => {
    return new Promise((resolve, reject) => {
        operation3(result1, (result3) => { resolve(result3); });
    });
}).then((result3) => {
    console.log("1 -> 3: " + result3);
});


// And make it possible to merge
let promiseOperation2 = new Promise((resolve, reject) => {
    operation2(0, (result2) => { resolve(result2); });
});
let promiseOperation3 = new Promise((resolve, reject) => {
    operation3(0, (result3) => { resolve(result3); });
});
Promise.all([
    promiseOperation1,
    promiseOperation2,
    promiseOperation3,
]).then((results) => {
    let sum = 0;
    results.forEach(k => sum += k);
    console.log("By merging", sum);
});