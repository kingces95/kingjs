var assert = require('assert');
var IInterface = require('@kingjs/i-interface');
var IEnumerable = require('..');

var Id = Symbol.for('@kingjs/IEnumerator');
var MoveNext = Symbol.for('@kingjs/IEnumerator.moveNext');
var Current = Symbol.for('@kingjs/IEnumerator.current');

assert(IEnumerable instanceof Function);
assert(IEnumerable.name == '@kingjs/IEnumerator');

assert(IEnumerable[IInterface.Id] == Id);
assert(IEnumerable.MoveNext == MoveNext);
assert(IEnumerable.Current == Current);