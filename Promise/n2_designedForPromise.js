// If your modules are designed specific for promise, it get much tidier

let opPromise1 = (value) => (resolve, reject) => {
    resolve(value + 1);
};
let opPromise2 = (value) => (resolve, reject) => {
    resolve(value + 2);
};
let opPromise3 = (value) => (resolve, reject) => {
    resolve(value + 3);
};

// Used like this:
new Promise(opPromise1(0))
    .then((result1) => new Promise(opPromise2(result1)))
    .then((result2) => new Promise(opPromise3(result2)))
    .then((result3) => console.log("Promise result: " + result3));

// Branching
let promise1 = new Promise(opPromise1(0));
let promise1To2 = promise1.then((result1) => new Promise(opPromise2(result1)))
    .then((result2) => console.log("1 -> 2: " + result2));
let promise1To3 = promise1.then((result1) => new Promise(opPromise3(result1)))
    .then((result3) => console.log("1 -> 3: " + result3));


// Merging
Promise.all([
    new Promise(opPromise1(0)),
    new Promise(opPromise2(0)),
    new Promise(opPromise3(0))
]).then((results) => {
    let sum = 0;
    results.forEach(k => sum += k);
    console.log("By merging", sum);
});