require('@kingjs/shim')
var assert = require('assert');
var of = require('@kingjs/rx.of');
var timer = require('@kingjs/rx.timer');
var Then = require('@kingjs/rx.then');
var ToPromise = require('..');

async function run() {
  var value = await timer()
    [Then](of(0))
    [ToPromise]();

  assert(value == 0);
}
run();