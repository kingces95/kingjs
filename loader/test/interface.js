'use strict';

var testRequire = require('../..');
var assert = testRequire('@kingjs/assert');
var assertThrows = testRequire('@kingjs/assert-throws');

var { loader } = require('..');

function testPredicates() {
  var name = 'IFace';

  var myLoader = loader.create({
    interfaces: { 
      [name]: { } 
    }
  });

  var IFaceType = myLoader.resolve(name);
  assert(IFaceType.isJavascriptNode);
  assert(IFaceType.isMember);
  assert(IFaceType.isType);
  assert(IFaceType.isInterface);

  assert(IFaceType.isAbstract);

  assert(IFaceType.loader == myLoader);
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

  var myLoader = loader.create({
    interfaces: { 
      IFoo: { },
      IBar: { extends: [ 'IFoo' ] }
    }
  });

  var IFooType = myLoader.resolve('IFoo');
  assert(!IFooType.extends);

  var IBarType = myLoader.resolve('IBar');
  assert(IBarType.extends.length == 1);
  assert(IBarType.extends[0] == IFooType);

  assert(IBarType.canCastTo(IFooType) == true);
  assert(IFooType.canCastTo(IBarType) == false);
}
testExtends();

function testMethod() {

  var myLoader = loader.create({
    interfaces: { 
      IFace: { 
        methods: { myMethod: null },
      } 
    }
  });

  var IFaceType = myLoader.resolve('IFace');

  var myMethodInfo = myLoader.resolve('IFace.myMethod')
  assert(myMethodInfo.isAbstract);

  var IFace = IFaceType.load();
  assert(IFace.myMethod == myMethodInfo.id);
}
testMethod();

function testAccessor() {

  var myLoader = loader.create({
    interfaces: { 
      IFace: { 
        accessors: { myAccessor: { get: null, set: null } }
      } 
    }
  });

  var IFaceType = myLoader.resolve('IFace');

  var myAccessorInfo = myLoader.resolve('IFace.myAccessor')
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

  var myLoader = loader.create({
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

  var IFooType = myLoader.resolve('IFoo');
  var ILeftType = myLoader.resolve('ILeft');
  var IRightType = myLoader.resolve('IRight');
  var IBottomType = myLoader.resolve('IBottom');

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

