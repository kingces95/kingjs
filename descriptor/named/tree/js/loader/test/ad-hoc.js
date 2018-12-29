'use strict';

var assert = require('@kingjs/assert');
var createLoader = require('../create');

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
      },
      methods: {
        MyIFooExMethod: {
          extends: 'IFoo' 
        }
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
var fooBarPkg = loader.children['@kingjs/foo-bar'];
var MyClass = fooBarPkg.children.MyClass;
var MyClassIfaces = MyClass.implements;
var MyClassFunc = MyClass.load();
var myClass = new MyClassFunc();

var IFoo = loader.resolve('@kingjs/foo-bar.IFoo')
var IFooExtends = IFoo.extends;
var fooExMethod = fooBarPkg.resolve('MyIFooExMethod');

var polymorphisms = MyClass.polymorphisms;
assert(IFoo.id in polymorphisms);

return;