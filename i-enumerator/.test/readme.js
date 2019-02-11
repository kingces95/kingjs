var assert = require('assert');
var IInterface = require('@kingjs/i-interface');
var IEnumerator = require('..');

var MoveNext = Symbol.for('@kingjs/IEnumerator.moveNext');
var Current = Symbol.for('@kingjs/IEnumerator.current');

assert(IEnumerator instanceof Function);
assert(IEnumerator.name == '@kingjs/IEnumerator');

assert(IEnumerator.MoveNext == MoveNext);
assert(IEnumerator.Current == Current);
assert(IEnumerator instanceof IInterface);