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

  // accessor.get
  var getInfo = myAccessor.children.get;
  var myGet = getInfo.load();
  assert(myGet() == 2);

  // accessor.set
  var setInfo = myAccessor.children.set;
  var mySet = setInfo.load();
  var target = { };
  mySet.call(target);
  assert(target.value == 3);
}
testLambda();

