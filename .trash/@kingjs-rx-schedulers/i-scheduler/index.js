var {
  '@kingjs': {
    reflect: { createInterface }
  }
} = module[require('@kingjs-module/dependencies')]();

/**
 * @description `IScheduler` has a members `now` and `schedule` which
 * are abstract versions of `Date.now()` and `process.nextTick`.
 */
module.exports = createInterface(
  '@kingjs/rx.IScheduler', {
    members: { 
      now: null,
      schedule: null,
    },
  }
);