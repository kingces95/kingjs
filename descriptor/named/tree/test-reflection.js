'use strict';

var createLoader = require('./js/loader/create');

var loader = createLoader();
loader.addChildren({
  packages: { 
    '@kingjs/foo-bar': {
      classes: {
        MyClass: {
          base: 'MyOtherClass'
        },
        MyOtherClass: {
          base: '@kingjs/baz.MyBazClass'
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
var fooBar = loader.children['@kingjs/foo-bar'];
var MyClass = fooBar.children.MyClass;
var MyClassFunc = MyClass.load();
var myClass = new MyClassFunc();

return;