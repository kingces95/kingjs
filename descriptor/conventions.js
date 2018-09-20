var testRequire = require('..');
var assert = testRequire('@kingjs/assert');

var normalize = require('./normalize');
var write = require('./write');

//var inherit = require('./inherit');
//var scorch = require('./scorch');
var merge = require('./merge');
var update = require('./update');
var filter = require('./filter');
var map = require('./map');
var mapNames = require('./map-names');
var reduce = require('./reduce');

// var nested = {
//   merge: require('./nested/merge'),
//   reduce: require('./nested/reduce'),
//   toArray: require('./nested/to-array'),
//   update: require('./nested/update')
// }

// var isTransform = {
//   filter: filter, 
//   map: map
// }

var thisArg = { };
var descriptor = { x:0 };

var isCopyOnWrite = {
  //scorch: scorch,
  inherit: inherit,
  merge: merge,
  update: update
};

function isCopyOnWriteTest() {

  for (var name in isCopyOnWrite) {
    for (var i = 0; i < 1; i++) {
      var copyOnWrite = i == 1;

      var test = normalize(isCopyOnWrite[name], 'func');
      var func = test.func;
      var ctx = Object.create(test.ctx || descriptor);
      var args = test.args || [];
      args.push(copyOnWrite);

      var result = func.apply(ctx, args);
      assert((result === ctx) == (copyOnWrite == false));
    }
  }
}
isCopyOnWriteTest();

var hasCallback = {
  filter: filter,
  update: update,
  map: map,
  mapNames: mapNames,
  merge: {
    func: merge,
    args: [{ x:1 }]
  },
  reduce: {
    func: reduce,
    args: [{ }]
  },
};

function hasCallbackTest() {

  var callback = function() {
    assert(thisArg == this);
    called = true;
  };

  var called = false;
  for (var name in hasCallback) {
    var test = normalize(hasCallback[name], 'func');
    var func = test.func;
    var args = test.args || [];
    var ctx = Object.create(test.ctx || descriptor);
    
    args.push(callback);
    args.push(thisArg);

    func.apply(ctx, args);
    
    assert(called);
    called = false;
  }
}
hasCallbackTest();