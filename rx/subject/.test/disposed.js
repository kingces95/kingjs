var assert = require('assert');
var Subject = require('..');
var { Subscribe } = require('@kingjs/i-observable');
var { Complete } = require('@kingjs/i-observer');

var subject = new Subject();
subject[Complete]();

// cannot subscribe to a subject after complete has been called
assert.throws(() => subject[Subscribe]());