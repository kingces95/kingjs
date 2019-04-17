var assert = require('assert');
var taskPool = require('..');

// pool of size one that buffers latest task and drops
// oldest task on buffer overrun.
var pool = taskPool();

var result = [];
var promise = new Promise(resolve => {
  pool(() => result.push(0));
  pool(() => result.push(1)); 
  pool(() => { 
    result.push(2);
    resolve() 
  });
});

promise.then(
  () => assert.deepEqual(result, [0, 2])
)
