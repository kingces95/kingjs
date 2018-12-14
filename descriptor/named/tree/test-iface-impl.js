'use strict';

var createLoader = require('./js/loader/create');

var testRequire = require('..');
var assert = testRequire('@kingjs/assert');

var loader = createLoader();
loader.addChildren({
  classes: {
    MyFooClass: {
      methods: { ['MyBarClass.IFace.myMethod']: '"foo"', },
      interfaces: { IFace: { methods: { myMethod: null } } }
    },
    MyBarClass: {
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

return;