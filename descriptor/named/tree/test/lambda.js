'use strict';

var createLoader = require('../js/loader/create');

var testRequire = require('../..');
var assert = testRequire('@kingjs/assert');

function testLambda() {

  var loader = createLoader({
    methods: {
      myMethod: { 
        func: '1' 
      }
    },
    accessors: {
      myAccessor: { 
        get: '2', 
        set: 'this.value = 3' 
      },
    }
  });

  // method
  var myMethodInfo = loader.resolve('myMethod');
  var myMethod = myMethodInfo.load();
  assert(myMethod() == 1);

  // accessor
  var myAccessor = loader.resolve('myAccessor');

  // getInfo
  var getterInfo = myAccessor.children.get;
  assert(getterInfo == myAccessor.get);
  assert(getterInfo.isGetter);

  // get
  var myGet = getterInfo.load();
  assert(myGet() == 2);

  // set
  var setterInfo = myAccessor.children.set;
  assert(setterInfo == myAccessor.set);
  assert(setterInfo.isSetter);

  // setInfo
  var mySet = setterInfo.load();
  var target = { };
  assert(undefined === mySet.call(target));
  assert(target.value == 3);
}
testLambda();

