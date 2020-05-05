var assert = require('assert');
var Subject = require('..');
var { Error } = require('@kingjs/rx.i-observer');

process.on('uncaughtException', function(err) {  
  console.log('pass!');
});

new Subject()[Error]();
assert.fail();