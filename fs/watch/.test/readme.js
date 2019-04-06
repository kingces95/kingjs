var assert = require('assert');
var { Subscribe } = require('@kingjs/i-observable');
var watch = require('..');

var observable = watch(process.cwd());
var dispose = observable[Subscribe](() => console.log('changed'));
setTimeout(dispose, 3000);
