'use strict';

var Node = require('.');

var assert = require('@kingjs/assert')

function readMe() {
  var node = Node.define({ }, [{
      name: 'Namespace',
      children: { 
        namespaces: 'Namespace',
        foos: 'Foo',
        bars: 'Bar',
      }
    }, {
      name: 'FooOrBar',
      accessors: {
        pi: { value: 3.14 },
      }
    }, {
      name: 'Bar', 
      base: 'FooOrBar',
    }, {
      name: 'Foo',
      base: 'FooOrBar',
      methods: {
        getField: function(x) { return this[x]; },
        setField: function(x,v) { this[x] = v; }
      },
      accessors: {
        e: () => 2.71828,
        sibling: { ref: '' },
        namespace: { 
          ancestor: true,
          type: 'Namespace'
        }
      }
    }
  ]);

  var Namespace = node.Namespace;
  var FooOrBar = node.FooOrBar;
  var Foo = node.Foo;
  var Bar = node.Bar;

  var prototype = Namespace.prototype;
  assert('defineNamespace' in prototype);
  assert('defineNamespaces' in prototype);

  var root = new Namespace();
  var myNs = root.defineNamespace('myNs', {
    foos: {
      MyFoo: { 
        pi: 3.14159
      },
    },
    bars: {
      MyBar: { },
      ['myNs.MyFoo']: { },
    }
  });

  var MyFoo = root.resolve('myNs.MyFoo');
  var MyBar = root.resolve('myNs.MyBar');

  assert(MyFoo instanceof Node);
  assert(MyFoo instanceof Foo);
  assert(MyFoo instanceof FooOrBar);

  assert(MyFoo.isFoo);
  assert(MyFoo.isFooOrBar);
  assert(MyFoo.isResolvable);
  assert(MyFoo.name == 'MyFoo');
  assert(MyFoo.fullName == 'myNs.MyFoo');
  
  assert(MyFoo.pi == 3.14159);
  assert(MyFoo.e == 2.71828);
  assert(MyFoo.root == root);
  
  assert(MyBar.pi == 3.14);
  assert(MyBar.root == root);

  var MyBarId = myNs.children[MyFoo.id];
  assert(MyBarId);
  assert(!MyBarId.isResolvable);

  assert('getField' in MyFoo);
  assert(MyFoo.getField('x') === undefined);
  assert('setField' in MyFoo);  
  MyFoo.setField('x', 1);
  assert(MyFoo.getField('x') == 1);
  assert(MyFoo.x == 1);
}
readMe();