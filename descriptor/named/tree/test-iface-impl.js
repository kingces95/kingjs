'use strict';

var createLoader = require('./js/loader/create');

var testRequire = require('..');
var assert = testRequire('@kingjs/assert');
var assertTheory = testRequire('@kingjs/assert-theory');
var assertThrows = testRequire('@kingjs/assert-throws');

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

  var MyFoo = MyFooClass.func;
  var myFoo = new MyFoo();

  var MyBarIFace = MyBarIFace.func;
  assert(myFoo[MyBarIFace.myMethod]() == 'foo');

  var MyBarFunc = MyBarClass.func;
  var myBar = new MyBarFunc();

  var MyFooIFaceFunc = MyFooIFace.func;
  assert(myBar[MyFooIFaceFunc.myMethod]() == 'bar');
}
test2ndPass();

assertTheory(function(test, id) {
  var interfaceName = 'IFoo';
  var methodName = 'method';
  var methodFullName = interfaceName + '.' + methodName;
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
  var IFoo = IFooType.func;

  var BaseType = loader.addClass('Base', {
    abstract: true,
    implements: test.baseImplements ? [ IFooType ] : null,
  });

  if (test.baseExplicit)
    BaseType.addMethod(methodFullName, () => baseExplicit);

  if (test.baseImplicit)
    BaseType.addMethod(methodName, () => baseImplicit);

  var DerivedType = loader.addClass('Derived', {
    base: BaseType,
    implements: test.implements ? [ IFooType ] : null,
  });

  if (test.explicit)
    DerivedType.addMethod(methodFullName, () => explicit);

  if (test.implicit)
    DerivedType.addMethod(methodName, () => implicit);

  if (test.explicit && !test.implements) {
    assertThrows(() => DerivedType.func);
    return;    
  }
  
  if (test.baseExplicit && !test.baseImplements) {
    assertThrows(() => BaseType.func);
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
    assertThrows(() => DerivedType.func);
    return;
  }

  var Base = BaseType.func;

  var Derived = DerivedType.func;
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
