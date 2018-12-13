'use strict';

var createLoader = require('./js/loader/create');

var testRequire = require('..');
var assert = testRequire('@kingjs/assert');
var assertThrows = testRequire('@kingjs/assert-throws');

var myBaseMethodNumber = 7;
var myMethodNumber = 1;
var myOtherMethodNumber = 3;
var iFace;

var loader = createLoader();
loader.addChildren({
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
      extension: true,
      extends: 'IFace',
      func: function(x) {
        return iFace.prototype.myMethod.call(this) + 
          iFace.prototype.myOtherMethod.call(this, x);
      }
    }
  }
});

var MyClass = loader.resolve('MyClass');
var MyClassFunc = MyClass.load();
var myClass = new MyClassFunc();
assert('myMethod' in myClass);
assert(myClass.myMethod() == myMethodNumber);
assert(myClass.myBaseMethod() == myBaseMethodNumber);
assert('myOtherMethod' in myClass == false);

var myBaseClass = MyClass.base.load();
assert(myBaseClass.prototype.myBaseMethod.call(myClass) == myBaseMethodNumber);

var IFace = loader.resolve('IFace');
iFace = IFace.load();
assertThrows(() => new iFace());

var myOtherMethod = loader.resolve('IFace.myOtherMethod');
var myOtherMethodTag = myOtherMethod.id;
assert(myOtherMethodTag in myClass);
assert(myClass[myOtherMethodTag](1) == myOtherMethodNumber + 1);

var myMethod = loader.resolve('IFace.myMethod');
var myMethodTag = myMethod.id;
assert(myMethodTag in myClass);
//assert(myClass[myMethodTag] == myClass.myMethod);
assert(myClass[myMethodTag]() == myMethodNumber);

assert(!!iFace.prototype.myMethod);
assert(iFace.prototype.myMethod.call(myClass) == myMethodNumber);

assert(!!iFace.prototype.myOtherMethod);
assert(iFace.prototype.myOtherMethod.call(myClass, 1) == myOtherMethodNumber + 1);

var myMethodAndOtherMethod = loader.resolve('myMethodAndOtherMethod');
assert(myClass[myMethodAndOtherMethod.id](1) = myMethodNumber + myOtherMethodNumber + 1)

return;