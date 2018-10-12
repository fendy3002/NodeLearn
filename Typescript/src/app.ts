import service1 = require('./service1');

let promise1 = service1()
.then(service2 => service2(0))
.then((service3) => {
    console.log(service3);
});

let promise2 = service1()
.then(service2 => service2(1))
.then((service3) => {
    console.log(service3);
});

promise1.then(() => promise2);