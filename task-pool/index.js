var { 
  assert,
  ['@kingjs']: {
    array: {
      Remove,
      RemoveAt
    }
  }
} = require('./dependencies');

var DefaultBounce = o => o[RemoveAt](0); 

/**
 * @description Creates function that will start a finite number
 * of tasks before queuing a finite number pending task until
 * the pending queue overflows and then calls `bounce` to pick a
 * pending task to drop.
 * 
 * @param maxConcurrent The maximum number of concurrent tasks.
 * The default value is 1.
 * @param maxPending The maximum number of pending tasks. The
 * default value is 1.
 * @param bounce Invoked to pick which pending task to drop. The
 * default will remove the oldest task.
 * 
 * @callback bounce
 * @param queue The pending task queue.
 * @returns Returns the queue with few elements.
 * 
 * @returns Returns a function that will start tasks.
 */
function taskPool(
  maxConcurrent = 1, 
  maxPending = 1, 
  bounce = DefaultBounce) {

  var queue = [];
  var running = [];

  return function nextTick(task) {
    if (running.length == maxConcurrent) {
      queue.push(task);
      if (queue.length > maxPending)
        queue = bounce(queue);
      return;
    }

    running.push(task);

    process.nextTick(async () => {
      await task();
      running[Remove](task);
      if (!queue.length)
        return;
      nextTick(queue.shift());
    });
  }
}

module.exports = taskPool;