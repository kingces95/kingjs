'use strict';

var createLoader = require('./js/loader/create');

var testRequire = require('..');
var assert = testRequire('@kingjs/assert');
var assertTheory = testRequire('@kingjs/assert-theory');

function test2ndPass() {

  // test method info creation deferred to after interface infos created
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

  var MyFooFunc = MyFooClass.load();
  var myFoo = new MyFooFunc();

  var MyBarIFaceFunc = MyBarIFace.load();
  assert(MyBarIFaceFunc.myMethod.call(myFoo) == 'foo');

  var MyBarFunc = MyBarClass.load();
  var myBar = new MyBarFunc();

  var MyFooIFaceFunc = MyFooIFace.load();
  assert(MyFooIFaceFunc.myMethod.call(myBar) == 'bar');
}
//test2ndPass();

function testInterfaceThunk() {
  var loader = createLoader({
    interfaces: {
      IFoo: { methods: { myMethod: null } }
    },
    classes: {
      MyImplicitClass: {
        implements: [ 'IFoo' ],
        methods: { myMethod: '42' },
      },
      MyExplicitClass: {
        implements: [ 'IFoo' ],
        methods: { ['IFoo.myMethod']: '43' },
      },
      MyClass: {
        implements: [ 'IFoo' ],
        methods: { 
          myMethod: '42',
          ['IFoo.myMethod']: '43', 
        },
      },
    }
  });

  var IFooType = loader.resolve('IFoo')
  var IFoo = IFooType.load();
  var myMethodInfo = IFooType.resolve('myMethod');
  var myMethod = myMethodInfo.func;
  assert(myMethod);
  assert(myMethod == IFoo.myMethod);
  var myMethodId = myMethodInfo.id;

  var MyExplicitClassType = loader.resolve('MyExplicitClass');
  var MyExplicitClass = MyExplicitClassType.load();
  var myExplicitClass = new MyExplicitClass();
  assert(myMethod != myExplicitClass[myMethodId]);
  assert(myMethod.call(myExplicitClass) == 43);

  var MyImplicitClassType = loader.resolve('MyImplicitClass');
  var MyImplicitClass = MyImplicitClassType.load();
  var myImplicitClass = new MyImplicitClass();
  assert(myMethodId in myImplicitClass);
  assert(myMethod == myImplicitClass[myMethodId]);
  assert(myMethod.call(myImplicitClass) == 42);

  var MyClassType = loader.resolve('MyClass');
  var MyClass = MyClassType.load();
  var myClass = new MyClass();
  assert(myMethod != myClass[myMethodId]);
  assert(myMethodId.call(myClass) == 43);
}
testInterfaceThunk();

assertTheory(function(test, id) {
  var loader = createLoader({
    interfaces: {
      IIndirectTarget: { 
        extends: ['ITarget'],
        methods: { myMethod: null }, 
      },
      ITarget: { methods: { myMethod: null } }
    },
    classes: {
      MyClass: {
        implements: [ !test.indirect ? 'ITarget' : 'IIndirectTarget' ],
        methods: { myMethod: test.implicit } 
      }
    }
  });

  var ITargetInfo = loader.resolve('ITarget');
  var MyClassInfo = loader.resolve('MyClass');

  if (test.explicitImpl)
    MyClassInfo.addMethod('ITarget.myMethod', test.explicit);

  var MyClass = MyClassInfo.load();
  var myClass = new MyClass();

  var ITarget = ITargetInfo.load();

  var result = ITarget.myMethod.call(myClass);
  assert(result == (test.explicitImpl ? test.explicit() : test.implicit()));

  if (test.indirect) {
    var IIndirectTargetInfo = loader.resolve('IIndirectTarget');
    var IIndirectTarget = IIndirectTargetInfo.load();
    var result = IIndirectTarget.prototype.myMethod.call(myClass);
    assert(result == test.implicit());   
  }
}, {
  implicit: () => 0,
  explicit: () => 1,
  explicitImpl: [ false, true ],
  indirect: [ false, true ],
});