var {
  ['@kingjs']: {
    reflect: { implementInterface },
    promise: { sleep },
    rx: { Scheduler }
  }
} = require('./dependencies');

/**
 * @description An instance of an `IScheduler` that schedules uses
 * `process.nextTick` and reports time from `Date.now`.
 */
class SetImmediateScheduler extends Scheduler { 
  constructor() {
    super(setImmediate);
  }
}

module.exports = new SetImmediateScheduler();