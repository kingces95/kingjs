var assert = testRequire('assert')
var Generator = require('..');

assert(Generator == (function* protoGenerator() { }).constructor);