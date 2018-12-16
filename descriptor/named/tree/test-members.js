'use strict';

var createLoader = require('./js/loader/create');

var testRequire = require('..');
var assert = testRequire('@kingjs/assert');
var assertTheory = testRequire('@kingjs/assert-theory');

function baseTest() {
  var loader = createLoader({
    classes: {
      AClass: {
        methods: { myMethod: null, },
      },
      BClass: {
        base: 'AClass',
        methods: { myMethod: null, },
      },
      CClass: {
        base: 'BClass',
      },
      DClass: {
        base: 'CClass',
        methods: { myMethod: null, },
      }
    }
  });

  var AClass = loader.resolve('AClass');
  var BClass = loader.resolve('BClass');
  var CClass = loader.resolve('CClass');
  var DClass = loader.resolve('DClass');

  var myMethodOnA = AClass.children.myMethod;
  var myMethodOnB = BClass.children.myMethod;
  var myMethodOnD = DClass.children.myMethod;

  assert(myMethodOnD.base == myMethodOnB);
  assert(myMethodOnB.base == myMethodOnA);
  assert(myMethodOnA.base == null);
}
baseTest();