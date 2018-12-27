'use strict';

var createLoader = require('../js/loader/create');

var testRequire = require('../..');
var assert = testRequire('@kingjs/assert');
var assertTheory = testRequire('@kingjs/assert-theory');
var assertThrows = testRequire('@kingjs/assert-throws');

var base = { };
Object.defineProperty(base, 'p', { get: () => 0, configurable: true });

var derived = Object.create(base);
Object.defineProperty(base, 'p', { set: o => o.f = 0 });

assert(derived.p == 0);

function test2ndPass() {

  // problem: explicit interface implementations use Symbols as names but
  // if the interface which defines that symbol is expressed in the same 
  // statement as the implementation then care needs to be taken to load all
  // interfaces in the statement before the methods so any explicit implementations
  // are able to find their symbol.
  var loader = createLoader({
    classes: {
      MyFooClass: {
        implements: [ 'MyBarClass.IFace' ],
        methods: { ['MyBarClass.IFace.myMethod']: '"foo"', },
        interfaces: { IFace: { methods: { myMethod: null } } }
      },
      MyBarClass: {
        implements: [ 'MyFooClass.IFace' ],
        methods: { ['MyFooClass.IFace.myMethod']: '"bar"', },
        interfaces: { IFace: { methods: { myMethod: null } } }
      }
    }
  });

  var MyFooClass = loader.resolve('MyFooClass');
  var MyFooIFace = loader.resolve('MyFooClass.IFace');
  var MyFooIFaceMethod = loader.resolve('MyFooClass.IFace.myMethod');
  var MyBarClass = loader.resolve('MyBarClass');
  var MyBarIFace = loader.resolve('MyBarClass.IFace')
  var MyBarIFaceMethod = loader.resolve('MyBarClass.IFace.myMethod')

  assert(loader.resolve(MyFooIFaceMethod.id) == MyFooIFaceMethod);
  assert(MyFooIFaceMethod.id in MyBarClass.children);
  assert(MyBarIFaceMethod.id in MyFooClass.children);

  var MyFoo = MyFooClass.load();
  var myFoo = new MyFoo();

  var MyBarIFace = MyBarIFace.load();
  assert(myFoo[MyBarIFace.myMethod]() == 'foo');

  var MyBarFunc = MyBarClass.load();
  var myBar = new MyBarFunc();

  var MyFooIFaceFunc = MyFooIFace.load();
  assert(myBar[MyFooIFaceFunc.myMethod]() == 'bar');
}
test2ndPass();

function testInterfaceAccessor() {
  var loader = createLoader({
    interfaces: {
      IFoo: {
        accessors: {
          bar: { get: null }
        }
      }
    },
    classes: {
      Baz: {
        implements: [ 'IFoo' ],
        accessors: { ['IFoo.bar']: '"value"', },
      },
    }
  });

  var IFooType = loader.resolve('IFoo');
  var IFooBar = loader.resolve('IFoo.bar');
  var IFooFooGetter = loader.resolve('IFoo.bar.get');

  var BazType = loader.resolve('Baz');
  var BazBar = BazType.children[IFooBar.id];
  var BazBarGetter = BazBar.get;

  var Baz = BazType.load();
  var baz = new Baz();
  assert(baz[IFooBar.id] == 'value');
}
testInterfaceAccessor();

assertTheory(function(test, id) {
  var interfaceName = 'IFoo';
  var name = 'method';
  var explicitName = interfaceName + '.' + name;
  var explicit = 'explicit';
  var implicit = 'implicit';
  var baseExplicit = 'baseExplicit';
  var baseImplicit = 'baseImplicit';

  var loader = createLoader({
    interfaces: {
      IFoo: { methods: { method: null } }
    }
  });

  var IFooType = loader.resolve(interfaceName);
  var IFoo = IFooType.load();
  var IFooMethod = loader.resolve(explicitName);

  var BaseType = loader.addClass('Base', {
    abstract: true,
    implements: test.baseImplements ? [ IFooType ] : null,
  });

  if (test.baseExplicit)
    BaseType.addMethod(explicitName, () => baseExplicit);

  if (test.baseImplicit)
    BaseType.addMethod(name, () => baseImplicit);

  var DerivedType = loader.addClass('Derived', {
    base: BaseType,
    implements: test.implements ? [ IFooType ] : null,
  });

  if (test.explicit)
    DerivedType.addMethod(explicitName, () => explicit);

  if (test.implicit)
    DerivedType.addMethod(name, () => implicit);

  if (test.explicit && !test.implements) {
    assertThrows(() => DerivedType.load());
    return;    
  }
  
  if (test.baseExplicit && !test.baseImplements) {
    assertThrows(() => BaseType.load());
    return;    
  }

  var expected;
  if (test.implements) {

    if (test.explicit) 
      expected = explicit;
    else if (test.implicit) 
      expected = implicit;
    else if (test.baseImplements && test.baseExplicit) 
      expected = baseExplicit;
    else if (test.baseImplicit) 
      expected = baseImplicit;

  } 
  else if (test.baseImplements) {

    if (test.baseExplicit)
      expected = baseExplicit;
    else if (test.implicit)
      expected = implicit;
    else if (test.baseImplicit) 
      expected = baseImplicit;

  }

  if (!test.implements && !test.baseImplements)
    return;

  if (!expected) {
    assertThrows(() => DerivedType.load());
    return;
  }

  var Derived = DerivedType.load();
  var derived = new Derived();
  var result = derived[IFoo.method]();
  assert(result == expected);
}, {
  baseImplements: [ true, false ],
  baseExplicit: [ true, false ],
  baseImplicit: [ true, false ],
  implements: [ true, false ],
  explicit: [ true, false ],
  implicit: [ true, false ],
});
