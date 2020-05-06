var { assert,
  '@kingjs-interface': { IInterface, IEnumerator }
} = module[require('@kingjs-module/dependencies')]()

var MoveNext = Symbol.for('@kingjs/IEnumerator.moveNext');
var Current = Symbol.for('@kingjs/IEnumerator.current');

assert(IEnumerator instanceof Function);
assert(IEnumerator.name == '@kingjs/IEnumerator');

assert(IEnumerator.MoveNext == MoveNext);
assert(IEnumerator.Current == Current);
assert(IEnumerator instanceof IInterface);