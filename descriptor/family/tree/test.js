'use strict';

var defineNodes = require('.');
var Node = require('./node');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert')

function readMe() {
  var node = defineNodes({ }, {
    root: { 
      children: { namespace: null }
    },
    namespace: { },
    fooOrBar: { },
    bar: { 
      base: 'fooOrBar',
    },
    foo: { 
      base: 'fooOrBar',
      methods: {
        getField: function(x) { return this[x]; },
        setField: function(x,v) { this[x] = v; }
      },
      accessors: {
        pi: 3.14159,
        e: () => 2.71828,
        sibling: { ref: '' },
        namespace: { ancestor: () => node.Namespace }
      }
    },
  });

  var Root = node.Root;
  var Namespace = node.Namespace;
  var FooOrBar = node.FooOrBar;
  var Foo = node.Foo;
  var Bar = node.Bar;

  var root = new Root();
  var ns = new Namespace(root, 'myNs');
  var foo = new Foo(ns, 'myFoo', { 
    myNumber: 42  
  });
  var bar = new Bar(ns, 'myBar');

  assert(foo instanceof Node);
  assert(foo instanceof Foo);
  assert(foo instanceof FooOrBar);

  assert(foo.isFoo);
  assert(foo.isFooOrBar);
  assert(foo.name == 'myFoo');
  assert(foo.fullName == 'myNs.myFoo');
  
  assert(foo.pi == 3.14159);
  assert(foo.e == 2.71828);
  assert(foo.namespace == ns);

  assert('getField' in foo);
  assert(foo.getField('x') === undefined);
  assert('setField' in foo);  
  foo.setField('x', 1);
  assert(foo.getField('x') == 1);
  assert(foo.x == 1);
}
readMe();