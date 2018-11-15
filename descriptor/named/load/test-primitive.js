
var load = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');
var assertThrows = testRequire('@kingjs/assert-throws');

function vacuousLoad() {
  var source = Object.freeze({ foo: { } });
  assert(load.call(source) === source);

  assertThrows(() => load.call({ foo: 0 }, o => o + 1));
}
vacuousLoad();

function posetToTrivialLoad() {
  var source = Object.freeze({ foo: 0 });
  assertThrows(() => load.call(source, o => o, { }) === source);
  assertThrows(() => load.call(source, o => o, { foo: undefined }) === source);
  assertThrows(() => load.call(source, o => o, { '*': undefined }) === source);
  assertThrows(() => load.call(source, o => o, { '*': { } }) === source);
  assertThrows(() => load.call(source, o => o, () => undefined) === source);
}
posetToTrivialLoad();

function simpleToTrivialLoad() {
  var source = Object.freeze({ foo: 0 });
  assertThrows(() => load.call(source, undefined, { }) === source);
  assertThrows(() => load.call(source, undefined, { foo: undefined }) === source);
  assertThrows(() => load.call(source, undefined, { '*': undefined }) === source);
  assertThrows(() => load.call(source, undefined, () => undefined) === source);
}
simpleToTrivialLoad();
