var assert = require('assert')
var Generator = require('..');

assert(Generator == (function* protoGenerator() { }).constructor);