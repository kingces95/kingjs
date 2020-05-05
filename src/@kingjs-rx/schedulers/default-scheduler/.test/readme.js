var assert = require('assert');
var { Now, Schedule } = require('@kingjs/rx.i-scheduler');
var scheduler = require('..');

var result = [];

process.nextTick(() => result.push('nextTick'));
setImmediate(() => result.push('setImmediate'));

scheduler[Schedule](() => result.push('now'))

setImmediate(() => result.push('setImmediateEnd'));
process.nextTick(() => result.push('nextTickEnd'));

setTimeout(
  // see https://nodejs.org/es/docs/guides/event-loop-timers-and-nexttick/
  // see https://github.com/ReactiveX/rxjs/issues/2603
  () => assert.deepEqual(
    result, [
      'now',
      'nextTick',
      'nextTickEnd',
      'setImmediate',
      'setImmediateEnd',
    ]
  ), 
  50
)