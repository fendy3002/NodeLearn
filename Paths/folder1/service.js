let path = require('path');

let scriptName = 'folder1/service.js';

console.log(`${scriptName} path.resolve()`, path.resolve());
console.log(`${scriptName} dirname`, __dirname);
console.log(`${scriptName} filename`, __filename);
console.log();

module.exports = path.resolve(__dirname, 'folder11', 'service.js');