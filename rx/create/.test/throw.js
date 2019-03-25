var assert = require('assert');
var create = require('..');
var { Subscribe } = require('@kingjs/i-observable');
var { Next, Complete, Error } = require('@kingjs/i-observer');

process.on('uncaughtException', function(err) {  
  console.log('Caught exception:', err);
});

new create((observer) => {
  observer[Next]();
  observer[Complete]();
})[Subscribe]();

new create((observer) => {
  observer[Error]();
  assert.fail();
})[Subscribe]();

assert.fail();