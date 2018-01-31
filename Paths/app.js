let path = require('path');

let scriptName = 'app.js';

console.log(`${scriptName} path.resolve()`, path.resolve());
console.log(`${scriptName} dirname`, __dirname);
console.log(`${scriptName} filename`, __filename);
console.log();

let nextRequire = require('./folder1/service.js');
console.log("nextRequire", nextRequire);
console.log();
require(nextRequire);
require('./folder2/service.js');