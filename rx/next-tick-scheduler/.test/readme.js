var assert = require('assert');
var { Now, Schedule } = require('@kingjs/rx.i-scheduler');
var scheduler = require('..');

var result = [];

process.nextTick(() => result.push('nextTick'));
setImmediate(() => result.push('setImmediate'));
setTimeout(() => result.push('setTimeout'));

scheduler[Schedule](() => result.push('now'));
scheduler[Schedule](() => result.push('delayed'), 10);

setTimeout(() => result.push('setTimeoutEnd'));
setImmediate(() => result.push('setImmediateEnd'));
process.nextTick(() => result.push('nextTickEnd'));

setTimeout(
  // see https://nodejs.org/es/docs/guides/event-loop-timers-and-nexttick/
  // see https://github.com/ReactiveX/rxjs/issues/2603
  () => assert.deepEqual(
    result, [
      'nextTick',
      'now',
      'nextTickEnd',
      'setTimeout',
      'setTimeoutEnd',
      'setImmediate',
      'setImmediateEnd',
      'delayed',
    ]
  ), 
  50
)