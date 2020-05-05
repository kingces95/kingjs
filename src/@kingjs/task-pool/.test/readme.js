var assert = require('assert');
var TaskPool = require('..');

// pool of size one that buffers latest task and drops
// oldest task on buffer overrun.
var pool = new TaskPool();

var events = [];
pool.on('start', o => events.push({ start: o.name }))
pool.on('finish', o => events.push({ finish: o.name }))
pool.on('block', o => events.push({ block: o.name }))
pool.on('drop', o => events.push({ drop: o.name }))

var result = [];
var promise = new Promise(resolve => {
  pool.start(function zero() { result.push(0) });
  pool.start(function one() { result.push(1) });
  pool.start(function two() { 
    result.push(2);
    resolve() 
  });
});

promise.then(() => {
  assert.deepEqual(result, [0, 2])
  assert.deepEqual(events, [
    { start: 'zero' },
    { block: 'one' },
    { block: 'two' },
    { drop: 'one' },
    { finish: 'zero' },
    { start: 'two' },
  ])
})
