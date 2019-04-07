var assert = require('assert');
var path = require('path');
var makeAbsolute = require('..');

var DirName = 'foo';

var expected = path.join(process.cwd(), DirName);

var actual = makeAbsolute(DirName, process.cwd());
assert(expected == actual)

var actual = makeAbsolute(DirName);
assert(expected == actual)

var actual = makeAbsolute(expected, process.cwd());
assert(expected == actual)

