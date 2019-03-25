var assert = require('assert');
var Subject = require('..');
var { Subscribe } = require('@kingjs/i-observable');
var { Complete } = require('@kingjs/i-observer');

var disposed = false;
var subject = new Subject((observer) => {
  observer[Complete]();
  disposed = true;

  // synchronous subjects should complete
  // before they exit this subscription logic
  // and so neither complete nor error call dispose
  // because a dispose method has not chance to be returned
  return assert;
});

subject[Subscribe](assert, undefined);
assert(disposed);

async function run() {
  var disposed = false;

  await new Promise((resolve) => {
    var subject = new Subject((observer) => {
      process.nextTick(() => {
        observer[Complete]();
        resolve();
      });

      return () => disposed = true;
    });

    // subscribe without a complete handler and 
    // still expect dispose logic to run
    subject[Subscribe](assert, undefined);
  })

  assert(disposed);
}
run();