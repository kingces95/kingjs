var {
  '@kingjs': {
    reflect: { implementInterface },
    promise: { sleep },
    rx: { Scheduler, IScheduler: { Schedule } }
  }
} = module[require('@kingjs-module/dependencies')]();

/**
 * @description An instance of an `IScheduler` that schedules uses
 * `process.nextTick` and reports time from `Date.now`.
 */
class SetTimeoutScheduler extends Scheduler { 
  constructor() {
    super();
  }

  [Schedule](callback, delay) {
    setTimeout(callback, delay)
  }
}

module.exports = new SetTimeoutScheduler();