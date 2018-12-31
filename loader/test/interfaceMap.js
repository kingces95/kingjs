'use strict';

var testRequire = require('../..');
var assert = testRequire('@kingjs/assert');
var assertTheory = testRequire('@kingjs/assert-theory');
var assertThrows = testRequire('@kingjs/assert-throws');

var loader = require('..');

function test2ndPass() {

  // problem: explicit interface implementations use Symbols as names but
  // if the interface which defines that symbol is expressed in the same 
  // statement as the implementation then care needs to be taken to load all
  // interfaces in the statement before the methods so any explicit implementations
  // are able to find their symbol.
  var myLoader = loader.fork({
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

  var MyFooClass = myLoader.resolve('MyFooClass');
  var MyFooIFace = myLoader.resolve('MyFooClass.IFace');
  var MyFooIFaceMethod = myLoader.resolve('MyFooClass.IFace.myMethod');
  var MyBarClass = myLoader.resolve('MyBarClass');
  var MyBarIFace = myLoader.resolve('MyBarClass.IFace')
  var MyBarIFaceMethod = myLoader.resolve('MyBarClass.IFace.myMethod')

  assert(myLoader.resolve(MyFooIFaceMethod.id) == MyFooIFaceMethod);
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
  var myLoader = loader.fork({
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

  var IFooType = myLoader.resolve('IFoo');
  var IFooBar = myLoader.resolve('IFoo.bar');
  var IFooFooGetter = myLoader.resolve('IFoo.bar.get');

  var BazType = myLoader.resolve('Baz');
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

  var myLoader = loader.fork({
    interfaces: {
      IFoo: { methods: { method: null } }
    }
  });

  var IFooType = myLoader.resolve(interfaceName);
  var IFoo = IFooType.load();
  var IFooMethod = myLoader.resolve(explicitName);

  var BaseType = myLoader.defineClass('Base', {
    abstract: true,
    implements: test.baseImplements ? [ IFooType ] : null,
  });

  if (test.baseExplicit)
    BaseType.defineMethod(explicitName, () => baseExplicit);

  if (test.baseImplicit)
    BaseType.defineMethod(name, () => baseImplicit);

  var DerivedType = myLoader.defineClass('Derived', {
    base: BaseType,
    implements: test.implements ? [ IFooType ] : null,
  });

  if (test.explicit)
    DerivedType.defineMethod(explicitName, () => explicit);

  if (test.implicit)
    DerivedType.defineMethod(name, () => implicit);

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
