'use strict';

var createLoader = require('./js/loader/create');

var testRequire = require('..');
var assert = testRequire('@kingjs/assert');
var assertThrows = testRequire('@kingjs/assert-throws');

var myBaseMethodNumber = 7;
var myMethodNumber = 1;
var myOtherMethodNumber = 3;
var IFace;

var loader = createLoader({
  classes: {
    MyClass: {
      base: 'MyBaseClass',
      implements: [ 'IFace' ],
      methods: {
        myMethod: () => myMethodNumber,
        myBaseMethod: () => myBaseMethodNumber,
        ['IFace.myOtherMethod']: x => myOtherMethodNumber + x,
        ['IFace.myMethod']: 'this.myMethod()',
      },
    },
    MyBaseClass: {
      abstract: true,
      methods: {
        myBaseMethod: null
      }     
    },
  },
  interfaces: {
    IFace: {
      methods: {
        myMethod: null,
        myOtherMethod: null
      }
    },
  },
  methods: {
    myMethodAndOtherMethod: {
      extends: 'IFace',
      func: function(x) {
        var iFace = IFace.load();
        return iFace.myMethod.call(this) + 
          iFace.myOtherMethod.call(this, x);
      }
    }
  }
});

var MyClassInfo = loader.resolve('MyClass');
var MyClass = MyClassInfo.load();
var myClass = new MyClass();
assert('myMethod' in myClass);
assert(myClass.myMethod() == myMethodNumber);
assert(myClass.myBaseMethod() == myBaseMethodNumber);
assert('myOtherMethod' in myClass == false);

var MyBaseClass = MyClassInfo.base.load();
assert(myClass.myBaseMethod() == myBaseMethodNumber);

IFace = loader.resolve('IFace');

var myOtherMethod = loader.resolve('IFace.myOtherMethod');
var myOtherMethodTag = myOtherMethod.id;
assert(myOtherMethodTag in myClass);
assert(myClass[myOtherMethodTag](1) == myOtherMethodNumber + 1);

var myMethod = loader.resolve('IFace.myMethod');
var myMethodTag = myMethod.id;
assert(myMethodTag in myClass);
//assert(myClass[myMethodTag] == myClass.myMethod);
assert(myClass[myMethodTag]() == myMethodNumber);

var myMethodAndOtherMethod = loader.resolve('myMethodAndOtherMethod');
assert(myClass[myMethodAndOtherMethod.id](1) == myMethodNumber + myOtherMethodNumber + 1)

var iFace = IFace.load();
assertThrows(() => new iFace());

assert(!!iFace.myMethod);
assert(iFace.myMethod.call(myClass) == myMethodNumber);

assert(!!iFace.myOtherMethod);
assert(iFace.myOtherMethod.call(myClass, 1) == myOtherMethodNumber + 1);
