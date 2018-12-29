'use strict';

var createLoader = require('../js/create');

var testRequire = require('../..');
var assert = testRequire('@kingjs/assert');
var assertThrows = testRequire('@kingjs/assert-throws');

function testPredicates() {
  var name = 'IFace';

  var loader = createLoader({
    interfaces: { 
      [name]: { } 
    }
  });

  var IFaceType = loader.resolve(name);
  assert(IFaceType.isJavascriptNode);
  assert(IFaceType.isMember);
  assert(IFaceType.isType);
  assert(IFaceType.isInterface);

  assert(IFaceType.isAbstract);

  assert(IFaceType.loader == loader);
  assert(IFaceType.name == name);
  assert(IFaceType.fullName == name);

  var polymorphisms = IFaceType.polymorphisms;
  assert(IFaceType.id in polymorphisms);
  assert(Object.getOwnPropertyNames(polymorphisms).length == 0);
  assert(Object.getOwnPropertySymbols(polymorphisms).length == 1);
  assert(Object.getPrototypeOf(polymorphisms) === null);

  var IFace = IFaceType.load();
  assert(IFace.name == name)
  assert(IFace.prototype === null);
  assertThrows(() => new IFace());
}
testPredicates();

function testExtends() {

  var loader = createLoader({
    interfaces: { 
      IFoo: { },
      IBar: { extends: [ 'IFoo' ] }
    }
  });

  var IFooType = loader.resolve('IFoo');
  assert(!IFooType.extends);

  var IBarType = loader.resolve('IBar');
  assert(IBarType.extends.length == 1);
  assert(IBarType.extends[0] == IFooType);

  assert(IBarType.canCastTo(IFooType) == true);
  assert(IFooType.canCastTo(IBarType) == false);
}
testExtends();

function testMethod() {

  var loader = createLoader({
    interfaces: { 
      IFace: { 
        methods: { myMethod: null },
      } 
    }
  });

  var IFaceType = loader.resolve('IFace');

  var myMethodInfo = loader.resolve('IFace.myMethod')
  assert(myMethodInfo.isAbstract);

  var IFace = IFaceType.load();
  assert(IFace.myMethod == myMethodInfo.id);
}
testMethod();

function testAccessor() {

  var loader = createLoader({
    interfaces: { 
      IFace: { 
        accessors: { myAccessor: { get: null, set: null } }
      } 
    }
  });

  var IFaceType = loader.resolve('IFace');

  var myAccessorInfo = loader.resolve('IFace.myAccessor')
  assert(myAccessorInfo.isAbstract);

  var IFace = IFaceType.load();
  assert(IFace.myAccessor == myAccessorInfo.id);

  var getterInfo = myAccessorInfo.get;
  assert(getterInfo.isAbstract);

  var setterInfo = myAccessorInfo.set;
  assert(setterInfo.isAbstract);
}
testAccessor();

function testDiamond() {

  var loader = createLoader({
    interfaces: { 
      IFoo: { 
        extends: [ 'ILeft', 'IRight' ]
      },
      ILeft: { 
        extends: [ 'IBottom' ]
      },
      IRight: {
        extends: [ 'IBottom' ]
      },
      IBottom: { }
    }
  });

  var IFooType = loader.resolve('IFoo');
  var ILeftType = loader.resolve('ILeft');
  var IRightType = loader.resolve('IRight');
  var IBottomType = loader.resolve('IBottom');

  assert(IFooType.canCastTo(ILeftType));
  assert(IFooType.canCastTo(IRightType));
  assert(IFooType.canCastTo(IBottomType));

  assert(ILeftType.canCastTo(IBottomType));
  assert(IRightType.canCastTo(IBottomType));

  var polymorphisms = IFooType.polymorphisms;
  assert(IFooType.id in polymorphisms);
  assert(ILeftType.id in polymorphisms);
  assert(IRightType.id in polymorphisms);
  assert(IBottomType.id in polymorphisms);
  assert(Object.getOwnPropertyNames(polymorphisms).length == 0);
  assert(Object.getOwnPropertySymbols(polymorphisms).length == 4);
  assert(Object.getPrototypeOf(polymorphisms) === null);
}
testDiamond();

