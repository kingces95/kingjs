var { 
  events: { EventEmitter },
  ['@kingjs']: {
    array: {
      Remove,
      RemoveAt
    }
  }
} = require('./dependencies');

var DefaultBounce = o => 0; 
var DropEvent = 'drop';
var StartEvent = 'start';
var FinishEvent = 'finish';
var BlockEvent = 'block';

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
 * @param bounce Invoked when the pending queue overflows and returns
 * the index of the task to drop. The default culls the oldest task.
 * 
 * @callback bounce
 * @param queue The pending task queue.
 * @returns Should return `queue` with fewer elements.
 * 
 * @remarks - TaskPool emits the following events with a task
 * @remarks -- `'start'` when the task is scheduled to run
 * @remarks -- `'finish'` when the task returns
 * @remarks -- `'block'` when the task is put onto the pending queue
 * @remarks -- `'drop'` when the task is dropped from pending queue
 * @remarks - Event `'finish'` is proceeded by `'start'`
 * @remarks - Event `'drop'` is proceeded by `'block'`
 * @remarks - Event `'start'` may be proceeded by `'block'`
 */
class TaskPool extends EventEmitter {
  constructor(
    maxConcurrent = 1, 
    maxPending = 1, 
    bounce = DefaultBounce) {
    super();

    this.maxConcurrent = maxConcurrent;
    this.maxPending = maxPending;
    this.bounce = DefaultBounce;

    this.pending = [];
    this.running = [];
  }

  dispose() {
    this.pending.length = 0;
  }

  start(task) {
    var { pending, running } = this;
    var { maxConcurrent, maxPending, bounce } = this;

    // block?
    if (running.length == maxConcurrent) {
      pending.push(task);
      this.emit(BlockEvent, task);

      // dump?
      if (pending.length > maxPending) {
        task = pending[RemoveAt](bounce(pending));
        this.emit(DropEvent, task);
      }
      return;
    }

    // start
    running.push(task);
    this.emit(StartEvent, task);

    process.nextTick(async () => {
      await task();

      running[Remove](task);
      this.emit(FinishEvent, task);
      
      if (!pending.length)
        return;
      this.start(pending.shift());
    });
  }
}

module.exports = TaskPool;