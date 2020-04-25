var fs = require('fs');
var obj = JSON.parse(fs.readFileSync('config.json', 'utf8'));
module.exports = obj;
