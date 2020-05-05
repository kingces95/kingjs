var assert = require('assert');
var taskPool = require('..');

var pool = taskPool(1, 2);

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
  () => assert.deepEqual(result, [0, 1, 2])
)
