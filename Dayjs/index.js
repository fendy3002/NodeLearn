let dayjs = require('dayjs');

console.log(
    dayjs(1632806733985).format("YYYY-MM-DD HH:mm:SS")
);
console.log(
    dayjs("1632806733985").format("YYYY-MM-DD HH:mm:SS")
);