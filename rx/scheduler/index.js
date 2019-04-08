var {
  ['@kingjs']: {
    reflect: { implementInterface },
    promise: { sleep },
    rx: { IScheduler: { Now, Schedule } }
  }
} = require('./dependencies');

/**
 * @description The base class for Schedulers. 
 */
class Scheduler {
  constructor(schedule) {
    this.schedule = schedule;
  }

  [Now]() { return Date.now(); }
  [Schedule](callback, delay) {
    var action = callback;
    
    if (delay) {
      action = async () => { 
        await sleep(delay);
        callback();
      }
    }

    this.schedule(action); 
  }
}

module.exports = Scheduler;