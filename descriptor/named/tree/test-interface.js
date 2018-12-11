'use strict';

var createLoader = require('./js/loader/create');

var testRequire = require('..');
var assert = testRequire('@kingjs/assert');
var assertThrows = testRequire('@kingjs/assert-throws');

var myMethodNumber = 1;
var myOtherMethodNumber = 3;
var iFace;

var loader = createLoader();
loader.addChildren({
  classes: {
    MyClass: {
      implements: [ 'IFace' ],
      methods: {
        myMethod: () => myMethodNumber,
        ['IFace.myOtherMethod']: (x) => myOtherMethodNumber + x,
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
var myClass = new MyClass().load();
assert('myMethod' in myClass);
assert(myClass.myMethod() == myMethodNumber);
assert('myOtherMethod' in myClass == false);

var IFace = loader.resolve('IFace');

var myMethod = loader.resolve('IFace.myMethod');
var myMethodTag = myMethod.id;
assert(myMethodTag in myClass);
assert(myClass[myMethodTag] == myClass.myMethod);
assert(myClass[myMethodTag]() == myMethodNumber);

var myOtherMethod = loader.resolve('IFace.myOtherMethod');
var myOtherMethodTag = myOtherMethod.id;
assert(myOtherMethodTag in myClass);
assert(myClass[myOtherMethodTag](1) == myOtherMethodNumber + 1);

iFace = IFace.load();
assertThrows(() => new iFace());

assert(iFace.prototype.myMethod);
assert(iFace.prototype.myMethod.call(myClass) == myMethodNumber);

assert(iFace.prototype.myOtherMethod);
assert(iFace.prototype.myOtherMethod.call(myClass, 1) == myOtherMethodNumber + 1);

myMethodAndOtherMethod = loader.resolve('myMethodAndOtherMethod');
assert(myClass[myMethodAndOtherMethod.id](1) = myMethodNumber + myOtherMethodNumber + 1)

return;