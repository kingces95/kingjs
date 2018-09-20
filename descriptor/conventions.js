var testRequire = require('..');
var assert = testRequire('@kingjs/assert');
var assertTheory = testRequire('@kingjs/assert-theory');

var normalize = require('./normalize');
var write = require('./write');

var inherit = require('./inherit');
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

assertTheory(function(test, id) {

  var meta = normalize(test.meta, 'func')
  var func = meta.func;
  var ctx = Object.create(meta.ctx || descriptor);
  var args = Object.create(meta.args || []);
  args.push(test.copyOnWrite);

  var result = func.apply(ctx, args);

  var copied = result !== ctx;
  assert(copied == test.copyOnWrite);
}, {
  meta: [
    //scorch: scorch,
    {
      func: merge,
      args: [{ y:0 }, null, null]
    }, {
      func: inherit,
      args: [[{ y:0 }]]
    }, {
      func: update,
      args: [() => 1, null]
    }
  ],
  copyOnWrite: [ true, false ]
});

assertTheory(function(test, id) {
  var called = false;
  var callback = function() {
    assert(thisArg == this);
    called = true;
  };

  var meta = normalize(test.meta, 'func');
  var func = meta.func;
  var args = Object.create(meta.args || []);
  var ctx = Object.create(meta.ctx || descriptor);
  
  args.push(callback);
  args.push(thisArg);

  func.apply(ctx, args);
  
  assert(called);
}, {
  meta: [
    filter,
    update,
    map,
    mapNames, {
      func: merge,
      args: [{ x:1 }]
    }, {
      func: reduce,
      args: [{ }]
    },
  ]
})