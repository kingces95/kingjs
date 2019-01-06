'use strict';

var assert = require('assert');
var defineInterface = require('..');

var {
  IIdentifiable,
  IPolymorphic,
  IInterface,
  IIdentifiable: { Identity },
  IPolymorphic: { Polymorphisms }
} = defineInterface;

function readMe() {
  var target = { };

  var IFoo = defineInterface(target, 'IFoo', {
    id: Symbol.for('@kingjs/IFoo'),
    members: { 
      foo: Symbol.for('IFoo (custom)'),
      baz: null,
      iterator: Symbol.iterator
    }
  });

  var IBar = defineInterface(target, 'IBar', {
    members: { bar: null },
    extends: [ IFoo ]
  });

  assert(Object.getOwnPropertySymbols(IBar[Polymorphisms]).length == 1);
  assert(IFoo[Identity] in IBar[Polymorphisms]);

  assert(target.IFoo == IFoo);
  assert(target.IBar == IBar);
  
  assert.throws(IFoo);
  assert.throws(IBar);

  assert(IFoo.prototype === null);
  assert(IBar.prototype === null);

  assert(Symbol.keyFor(IFoo.baz) == '@kingjs/IFoo.baz');
  assert(Symbol.keyFor(IFoo.foo) == 'IFoo (custom)');
  assert(Symbol.keyFor(IBar.bar) == 'IBar.bar');

  assert(Symbol.keyFor(IFoo[Identity]) == '@kingjs/IFoo');
  assert(Symbol.keyFor(IBar[Identity]) == 'IBar');

  assert(IFoo.name == '@kingjs/IFoo');
  assert(IBar.name == 'IBar');

  assert(IFoo[Symbol.hasInstance] == require('@kingjs/has-instance'));

  assert(IFoo instanceof IIdentifiable);
  assert(IFoo instanceof IPolymorphic);
  assert(IFoo instanceof IInterface);

  assert(IBar instanceof IIdentifiable);
  assert(IBar instanceof IPolymorphic);
  assert(IBar instanceof IInterface);

  function FooBar() { }
  FooBar.prototype[IFoo.foo] = 'foo';
  FooBar.prototype[IFoo.baz] = 'baz';
  FooBar.prototype[IBar.bar] = 'bar';
  FooBar[Polymorphisms] = {
    [IFoo[Identity]]: IFoo,
    [IBar[Identity]]: IBar,
  }

  var fooBar = new FooBar();
  assert(fooBar instanceof IFoo);
  assert(fooBar instanceof IBar);
}
readMe();