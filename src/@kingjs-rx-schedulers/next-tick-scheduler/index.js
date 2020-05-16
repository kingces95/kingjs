var {
  '@kingjs': {
    reflect: { implementInterface },
    promise: { sleep },
    '-rx': { Scheduler }
  }
} = module[require('@kingjs-module/dependencies')]();

/**
 * @description An instance of an `IScheduler` that schedules uses
 * `process.nextTick` and reports time from `Date.now`.
 */
class NextTickScheduler extends Scheduler { 
  constructor() {
    super(process.nextTick.bind(process));
  }
}

module.exports = new NextTickScheduler();