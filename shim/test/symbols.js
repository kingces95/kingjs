'use strict';

var assert = require('assert');

function readMe() {

  var {
    IIterable,
    IInterface,
    IEnumerable,
    IEnumerator,
    
    IInterface: { Id },
    IIterable: { GetIterator },
    IEnumerable: { GetEnumerator },
    IEnumerator: { MoveNext, Current },  
  } = Symbol.kingjs;

  assert(IIterable.name == 'IIterable');
  assert(IInterface.name == 'IInterface');
  assert(IEnumerable.name == 'IEnumerable');
  assert(IEnumerator.name == 'IEnumerator');

  assert(GetIterator === Symbol.iterator);
  assert(Symbol.keyFor(GetEnumerator) == '@kingjs/IEnumerable.getEnumerator');
  assert(Symbol.keyFor(MoveNext) == '@kingjs/IEnumerator.moveNext');
  assert(Symbol.keyFor(Current) == '@kingjs/IEnumerator.current');
}
readMe();