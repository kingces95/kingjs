var {
  ['@kingjs']: {
    reflect: { implementInterface },
    promise: { sleep },
    rx: { Scheduler }
  }
} = module[require('@kingjs-module/dependencies')]();

/**
 * @description An instance of an `IScheduler` that calls the function 
 * to schedule synchronously and reports time from `Date.now`.
 */
class DefaultScheduler extends Scheduler { 
  constructor() {
    super(o => o());
  }
}

module.exports = new DefaultScheduler();