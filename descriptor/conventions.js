var testRequire = require('..');
var assert = testRequire('@kingjs/assert');
var assertTheory = testRequire('@kingjs/assert-theory');

var normalize = require('./normalize');
var write = require('./write');

//var scorch = require('./scorch');
var create = require('./create');
var inherit = require('./inherit');
var merge = require('./merge');
var update = require('./update');
var filter = require('./filter');
var map = require('./map');
var mapNames = require('./map-names');
var reduce = require('./reduce');
var mergeWildcards = require('./merge-wildcards');

var nested = {
  merge: require('./nested/merge'),
  reduce: require('./nested/reduce'),
  //toArray: require('./nested/to-array'),
  update: require('./nested/update')
}

// var isTransform = {
//   filter: filter, 
//   map: map
// }

var thisArg = { };
var descriptor = { x:0 };

// merge theory; undefined target is always overwritten

assertTheory(function copyOnWriteTest(test, id) {

  var meta = normalize(test.meta, 'func')
  var func = meta.func;
  var args = Object.create(meta.args || []);
  var ctx = meta.ctx === null ? args[0] : create(meta.ctx || descriptor, true);
  args.push(test.copyOnWrite);

  var result = func.apply(ctx, args);

  var copied = result !== ctx;
  assert(copied == test.copyOnWrite);
}, {
  copyOnWrite: [ true, false ],
  meta: [
    //scorch: scorch,
    {
      func: nested.merge,
      ctx: null,
      args: [{ }, { x:0 }, { x:null }, null]
    }, {
      func: nested.update,
      ctx: null,
      args: [{ }, { x:0 }, (_, x) => x, null]
    }, {
      func: mergeWildcards,
      ctx: { '*':null },
      args: [{ x:0 }]
    }, {
      func: merge,
      args: [{ y:0 }, null, null]
    }, {
      func: inherit,
      args: [[{ y:0 }]]
    }, {
      func: update,
      args: [() => 1, null]
    }
  ]
});

assertTheory(function thisArgCallbackTest(test, id) {
  var called = false;
  var callback = function() {
    assert(thisArg == this);
    called = true;
  };

  var meta = normalize(test.meta, 'func');
  var func = meta.func;
  var args = (meta.args || []).slice();
  var ctx = Object.create(meta.ctx || descriptor);
  
  args.push(callback);
  args = args.concat(meta.afterCallbackArgs || []);
  args.push(thisArg);

  func.apply(ctx, args);
  
  assert(called);
}, {
  meta: [
    {
      func: nested.merge,
      ctx: null,
      args: [0, 1],
    }, {
      func: nested.reduce,
      ctx: null,
      args: [{ }, { x:0 }],
      afterCallbackArgs: [null]
    }, {
      func: nested.update,
      args: [0, null]
    }, filter,
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