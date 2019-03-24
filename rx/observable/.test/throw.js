var assert = require('assert');
var Observable = require('..');

process.on('uncaughtException', function(err) {  
  console.log('uncaught exception:', err.stack || err);
});

new Observable((observer) => {
  observer.next();
  observer.complete();
}).subscribe();

new Observable((observer) => {
  observer.error();
  assert.fail();
}).subscribe();

assert.fail();