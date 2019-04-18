var assert = require('assert');
var TaskPool = require('..');

// pool of size one that buffers latest task and drops
// oldest task on buffer overrun.
var pool = new TaskPool();

var result = [];
var promise = new Promise(resolve => {
  pool.start(() => result.push(0));
  pool.start(() => result.push(1)); 
  pool.start(() => { 
    result.push(2);
    resolve() 
  });
});

promise.then(
  () => assert.deepEqual(result, [0, 2])
)
