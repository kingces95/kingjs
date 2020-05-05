var assert = require('assert');
var create = require('..');
var { Subscribe } = require('@kingjs/rx.i-observable');
var { Error } = require('@kingjs/rx.i-observer');

process.on('uncaughtException', function(err) {  
  console.log('Caught exception:', err);
});

new create((observer) => {
  observer[Error]();
  assert.fail();
})[Subscribe]();

assert.fail();