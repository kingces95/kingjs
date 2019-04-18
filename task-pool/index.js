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
 * @description A pool of running tasks and a queue of pending
 * tasks. Tasks are added by calling `start` and are either
 * executed without delay or put into a pending queue which, 
 * upon overflow, is culled via a callback.
 * 
 * @param maxConcurrent The maximum number of concurrent tasks.
 * The default value is 1.
 * @param maxPending The maximum number of pending tasks. The
 * default value is 1.
 * @param bounce Invoked upon pending queue overflow to pick 
 * which pending task to drop. The default culls the oldest task.
 * 
 * @callback bounce
 * @param queue The pending task queue.
 * @returns Should return `queue` with fewer elements.
 */
class TaskPool {
  constructor(
    maxConcurrent = 1, 
    maxPending = 1, 
    bounce = DefaultBounce) {

    this.maxConcurrent = maxConcurrent;
    this.maxPending = maxPending;
    this.bounce = DefaultBounce;

    this.pending = [];
    this.running = [];
  }

  start(task) {
    var { pending, running } = this;
    var { maxConcurrent, maxPending, bounce } = this;

    if (running.length == maxConcurrent) {
      pending.push(task);
      if (pending.length > maxPending)
        pending = bounce(pending);
      return;
    }

    running.push(task);

    process.nextTick(async () => {
      await task();
      running[Remove](task);
      if (!pending.length)
        return;
      this.start(pending.shift());
    });
  }
}

module.exports = TaskPool;