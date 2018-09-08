'use strict';

var updateNode = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');
var assertTheory = testRequire('@kingjs/assert-theory');

assertTheory(function(test, id) {
  
  var context = 'context';

  var node = { };
  if (test.nodeValue)
    node[test.name] = test.value;

  if (test.freeze)
    Object.freeze(node);

  var first = { };
  if (test.firstValue)
    first[test.name] = 'first';
  if (test.firstStar)
    first['*'] = 'first*';

  var second = { };
  if (test.secondValue)
    second[test.name] = 'second';
  if (test.secondStar)
    second['*'] = 'second*';

  var args;
  var callback = function(value, context, first, second, copyOnWrite) {
    args = {
      value: value,
      context: context,
      first: first,
      second: second,
      copyOnWrite: copyOnWrite
    };
    return test.update;
  }

  var result = updateNode.call(
    node, 
    callback, 
    context, 
    first, 
    second,
    test.copyOnWrite
  );

  var isFrozen = Object.isFrozen(result);
  assert(test.freeze == isFrozen);

  if (test.nodeValue) {
    assert(result[test.name] == test.update);

    var copyOnWrite = test.copyOnWrite || isFrozen;
    var write = test.value !== test.update;
    var copied = copyOnWrite && write;
    assert(copied == (result != node));

    assert(args.value == test.value);
    assert(args.context == context);
    assert(args.copyOnWrite == test.copyOnWrite);
    assert(args.first === (
      test.firstValue ? 'first' : test.firstStar ? 'first*' : undefined
    ));
    assert(args.second === (
      test.secondValue ? 'second' : test.secondStar ? 'second*' : undefined
    ));  
  }
}, {
  name: 'foo',
  value: [ undefined, null, 0, 1 ],
  update: [ undefined, null, 0, 0 ],
  copyOnWrite: [ false, true ],
  freeze: [ false, true ],
  nodeValue: [ false, true ],
  firstValue: [ false, true ],
  secondValue: [ false, true ],
  firstStar: [ false, true ],
  secondStar: [ false, true ],
});

function readMe() {
  var node = {
    apple: { name: 'Apple' },
    orange: { name: 'Orange' },
    tomato: { name: 'Tomato' }
  }

  var fruits = {
    apple: { weight: 2 },
    orange: { weight: 3 },
    banana: { weight: 4 }
  }

  var vegetables = {
    tomato: { weight: 1 }
  }

  var callbacks = [ ];
  var callback = function(value, context, x, y) {
    callbacks.push({ 
      value: value, 
      context: context, 
      x: x, 
      y: y 
    });

    return value;
  }

  var context = 'My Context';

  var result = updateNode.call(node, callback, context, fruits, vegetables);
}
readMe();

