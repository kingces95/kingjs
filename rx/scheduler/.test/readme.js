var assert = require('assert');
var { Now, Schedule } = require('@kingjs/rx.i-scheduler');
var Scheduler = require('..');

var scheduler = new Scheduler(o => o());

assert(scheduler[Now]() == Date.now());

var result;
scheduler[Schedule](() => result = 'now');
assert(result == 'now');