var assert = require('assert');
var Subject = require('@kingjs/rx.subject');
var { Subscribe } = require('@kingjs/i-observable');
var { Next } = require('@kingjs/i-observer');
var Select = require('@kingjs/rx.select');
var Refine = require('..');
var clock = require('@kingjs/rx.clock');
var sleep = require('@kingjs/promise.sleep');

// the state to refine
var invert = false;

// subject observes refinements and emits clock ticks
var subject = new Subject();
var invertableClock = subject[Refine]((x, o) => {
  if (!x) {
    // activate clock with ticks refined by invert
    return clock()[Select](o => invert ? -o : o);
  }
  invert = o;
})

// subscribe to invertable clock
var resolved;
var dispose = invertableClock[Subscribe](o => resolved(o))

process.nextTick(async () => {

  // start clock and assert ticks are NOT inverted
  var promise = new Promise(o => resolved = o);
  subject[Next](false);
  var value = await promise;
  assert(value > 0);

  // refine clock and assert ticks ARE inverted
  var promise = new Promise(o => resolved = o);
  subject[Next](true);
  var value = await promise;
  assert(value < 0);

  dispose();
})
