var assert = require('assert');
var defineInterface = require('..');

var {
  IInterface,
  IInterface: { Id }
} = defineInterface;

function readMe() {
  var target = { };

  var { IFoo } = defineInterface(target, 'IFoo', {
    id: Symbol.for('@kingjs/IFoo'),
    members: { 
      Foo: Symbol.for('IFoo (custom)'),
      Baz: null,
      iterator: Symbol.iterator
    }
  });

  var { IBar } = defineInterface(target, 'IBar', {
    id: Symbol.for('IBar'),
    members: { Bar: null },
    extends: [ IFoo ]
  });

  var { IBaz } = defineInterface(target, 'IBaz', {
    id: Symbol.for('IBaz')
  });

  assert(IFoo[Id] in IBar);

  assert(target.IFoo == IFoo);
  assert(target.IBar == IBar);
  
  assert.throws(IFoo);
  assert.throws(IBar);

  assert(IFoo.prototype === null);
  assert(IBar.prototype === null);

  assert(Symbol.keyFor(IFoo.Baz) == '@kingjs/IFoo.Baz');
  assert(Symbol.keyFor(IFoo.Foo) == 'IFoo (custom)');
  assert(Symbol.keyFor(IBar.Bar) == 'IBar.Bar');

  assert(Symbol.keyFor(IFoo[Id]) == '@kingjs/IFoo');
  assert(Symbol.keyFor(IBar[Id]) == 'IBar');

  assert(IFoo.name == '@kingjs/IFoo');
  assert(IBar.name == 'IBar');

  assert(IInterface[Id] in IFoo);
  assert(IInterface[Id] in IBar);

  function FooBar() { }

  FooBar.prototype[IFoo[Id]] = IFoo;
  FooBar.prototype[IFoo.Foo] = 'Foo';
  FooBar.prototype[IFoo.Baz] = 'Baz';

  FooBar.prototype[IBar[Id]] = IBar;
  FooBar.prototype[IBar.Bar] = 'Bar';

  var fooBar = new FooBar();
  assert(IFoo[Id] in fooBar);
  assert(fooBar instanceof IFoo);
  assert(IBar[Id] in fooBar);
  assert(fooBar instanceof IBar);
  assert(fooBar instanceof IBaz == false);
}
readMe();