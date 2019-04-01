require('@kingjs/shim')
var assert = require('assert')
var Blend = require('..');
var { Subscribe } = require('@kingjs/i-observable');
var clock = require('@kingjs/rx.clock');
var Select = require('@kingjs/rx.select');
var sleep = require('@kingjs/promise.sleep');

var result = [];
var expected = [];

function start(ms, id) {
  return clock(ms)[Select](t => {
    var value = { t, id };
    expected.push(value);
    return value;
  })
}

process.nextTick(async () => {
  var a = start(5, 'a')
  var b = start(7, 'b')
  var c = start(11, 'c')

  var abc = a[Blend](b, c);
  var dispose = abc[Subscribe](o => { result.push(o) });
  await sleep(27);
  dispose();

  assert.deepEqual(expected, result);
});