var assert = require('assert');
var is = require('@kingjs/reflect.is');
var Append = require('..');

var a = Buffer.from('a')
assert(a[Append]().toString() == 'a')

var b = Buffer.from('b')
assert(a[Append](b).toString() == 'ab')
assert(a[Append](b, b).toString() == 'abb')

