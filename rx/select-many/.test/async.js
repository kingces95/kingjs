require('@kingjs/shim')
var assert = require('assert');
var SelectMany = require('..');
var { Subscribe } = require('@kingjs/rx.i-observable');

var of = require('@kingjs/rx.of');
var clock = require('@kingjs/rx.clock');
var Select = require('@kingjs/rx.select');
var fromAsync = require('@kingjs/rx.from-async');

var sleep = require('@kingjs/promise.sleep');
var never = require('@kingjs/promise.never');

var result = [];
var expected = [];

process.nextTick(async () => {

  var dispose = fromAsync(
    async function* () {
      yield 5,
      yield 11,
      await never();
    }
  )[SelectMany](o => {
    console.log('clock', o);
    return clock(o)[Select](t => {
      var pair = { t, o };
      expected.push(pair);
      return pair;
    })
  })[Subscribe](o => result.push(o));

  await sleep(150);
  dispose();
  //console.log(result);
  assert.deepEqual(result, expected);
  assert(result.length);
});