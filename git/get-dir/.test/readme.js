var assert = require('assert');
var getDir = require('..');

console.log(getDir());

var gitFoo = getDir('foo');
console.log(gitFoo);
