'use strict';

var assert = require('@kingjs/assert');
var createLoader = require('./js/loader/create');

var loader = createLoader();
loader.addChildren({
  packages: { 
    '@kingjs/foo-bar': {
      classes: {
        MyClass: {
          base: 'MyOtherClass',
          implements: [ 'IFoo', 'IBar' ]
        },
        MyOtherClass: {
          base: '@kingjs/baz.MyBazClass',
          implements: [ 'IBaz' ]
        }
      },
      interfaces: {
        IFoo: { extends: ['IBaz'] },
        IBar: { extends: ['IBaz'] },
        IBaz: { }
      }
    },
    '@kingjs/baz': {
      classes: {
        MyBazClass: null
      }
    },
    '@kingjs/baz-moo': null,
  }
});

var a = Object.getPrototypeOf(loader);
var n = Object.getOwnPropertyNames(a);

var obj = loader.resolve(Object);
var fullName = obj.fullName;
var fooBar = loader.children['@kingjs/foo-bar'];
var MyClass = fooBar.children.MyClass;
var MyClassIfaces = MyClass.implements;
var MyClassFunc = MyClass.load();
var myClass = new MyClassFunc();

var IFoo = loader.resolve('@kingjs/foo-bar.IFoo')
var IFooExtends = IFoo.extends;

var vtable = MyClass.vtable;
assert(IFoo.id in vtable);

return;