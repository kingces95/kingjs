var assert = require('assert');
var Subject = require('..');
var { Subscribe } = require('@kingjs/i-observable');
var { Next, Complete, Error } = require('@kingjs/i-observer');

process.on('uncaughtException', function(err) {  
  console.log('Caught exception:', err);
});

new Subject((observer) => {
  observer[Next]();
  observer[Complete]();
})[Subscribe]();

new Subject((observer) => {
  observer[Error]();
  assert.fail();
})[Subscribe]();

assert.fail();