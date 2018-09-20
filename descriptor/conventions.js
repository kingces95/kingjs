var testRequire = require('..');
var assert = testRequire('@kingjs/assert');

var write = require('./write');

//var inherit = require('./inherit');
//var merge = require('./merge');
//var scorch = require('./scorch');
var update = require('./update');
var filter = require('./filter');
var map = require('./map');

// var nested = {
//   merge: require('./nested/merge'),
//   reduce: require('./nested/reduce'),
//   toArray: require('./nested/to-array'),
//   update: require('./nested/update')
// }

// var isCopyOnWrite = {
//   inherit: inherit,
//   merge: merge,
//   scorch: scorch,
//   update: update
// };

// var isTransform = {
//   filter: filter, 
//   map: map
// }

var hasCallback = {
  filter: {
    func: filter,
    callbackAt: 0
  },
  update: {
    func: update,
    callbackAt: 0
  },
  //merge: filter,
  map: {
    func: update,
    callbackAt: 0
  }
};

function hasCallbackTest() {
  var called = false;
  var thisArg = { }
  var callback = function() {
    assert(thisArg == this);
    called = true;
  };

  for (var name in hasCallback) {
    var test = hasCallback[name];
    var args = [callback, thisArg];
    for (var i = 0; i < test.callbackAt; i++)
      args.unshift({ x:0 });

    test.func.apply({ x:0 }, args);
    
    assert(called);
    called = false;
  }
}
hasCallbackTest();