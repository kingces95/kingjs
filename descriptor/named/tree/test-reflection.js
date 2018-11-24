'use strict';

var createLoader = require('./js/loader/create');

var loader = createLoader();
loader.addChildren({
  packages: { 
    '@kingjs/foo-bar': {
      classes: {
        MyClass: null,
        MyOtherClass: null
      }
    },
    '@kingjs/baz-moo': null,
  }
});

var obj = loader.resolve('intrinsic.Object');
var fooBar = loader.children['@kingjs/foo-bar'];
var MyClass = fooBar.children.MyClass;
var MyClassFunc = MyClass.load();
var myClass = new MyClassFunc();

return;