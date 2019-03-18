var AsyncGenerator = require('./async-generator');

/**
 * @description Enumerates a collection of promises resolving each during
 * `process.nextTick` calling itself on the resolved values. 
 * 
 * @param task A collection of promises expressed as (1) a Promise that 
 * returns a promise, (2) an array of Promises, (3) an iterator, possibly 
 * async, that returns expressions of a promise, or (4) a function that
 * returns an expression of a promise.
 * 
 * @remarks If `task` is null the task is ignored.  
 */
function start(task) {
  if (task === undefined)
    return;

  if (task instanceof Promise) {
    return process.nextTick(async () => { 
      start(await task) 
    });
  }
  
  if (task instanceof Array)
    return task.forEach(o => start(o));

  if (task instanceof AsyncGenerator) {
    return process.nextTick(async () => { 
      for await (var o of task) { 
        start(o) 
      } 
    });
  }

  if (task instanceof Function)
    return start(task());

  assert.fail();
}

module.exports = start;