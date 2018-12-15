'use strict';

var createLoader = require('./js/loader/create');

var testRequire = require('..');
var assert = testRequire('@kingjs/assert');
var assertTheory = testRequire('@kingjs/assert-theory');

function secondPassTest() {
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

  var MyBarIFaceFunc = MyBarIFace.load();
  var MyFooFunc = MyFooClass.load();
  var myFoo = new MyFooFunc();
  assert(MyBarIFaceFunc.prototype.myMethod.call(myFoo) == 'foo');

  var MyFooIFaceFunc = MyFooIFace.load();
  var MyBarFunc = MyBarClass.load();
  var myBar = new MyBarFunc();
  assert(MyFooIFaceFunc.prototype.myMethod.call(myBar) == 'bar');
}
secondPassTest();

function explicitImpTest() {
  var loader = createLoader({
    interfaces: {
      IFoo: { methods: { myMethod: null } }
    },
    classes: {
      MyClass: {
        implements: [ 'IFoo' ],
        methods: { myMethod: '42', } 
      }
    }
  });

  var MyClassType = loader.resolve('MyClass');
  var MyClass = MyClassType.load();
  var myClass = new MyClass();

  var IFooType = loader.resolve('IFoo')
  var IFoo = IFooType.load();
  assert(IFoo.prototype.myMethod.call(myClass) == 42);
}
explicitImpTest();

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

  var result = ITarget.prototype.myMethod.call(myClass);
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