let path = require('path');

let scriptName = 'folder1/folder11/service.js';

console.log(`${scriptName} path.resolve()`, path.resolve());
console.log(`${scriptName} dirname`, __dirname);
console.log(`${scriptName} filename`, __filename);
console.log();