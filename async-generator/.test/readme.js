var assert = require('assert');
var AsyncGenerator = require('..');

var asyncGenerator = async function* () { };

var prototype = Object.getPrototypeOf(asyncGenerator);
assert(prototype == AsyncGenerator.prototype);

assert(asyncGenerator instanceof AsyncGenerator);