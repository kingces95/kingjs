var testRequire = require('..');
var assert = testRequire('@kingjs/assert');
var assertTheory = testRequire('@kingjs/assert-theory');

var normalize = require('@kingjs/descriptor.normalize');
var write = require('@kingjs/descriptor.write');
var scorch = require('@kingjs/descriptor.scorch');
var create = require('@kingjs/descriptor.create');
var inherit = require('@kingjs/descriptor.inherit');
var merge = require('@kingjs/descriptor.merge');
var update = require('@kingjs/descriptor.update');
var filter = require('@kingjs/descriptor.filter');
var map = require('@kingjs/descriptor.map');
var mapNames = require('@kingjs/descriptor.map-names');
var reduce = require('@kingjs/descriptor.reduce');
var mergeWildcards = require('@kingjs/descriptor.merge-wildcards');

var nested = {
  merge: require('@kingjs/descriptor.nested.merge'),
  reduce: require('@kingjs/descriptor.nested.reduce'),
  toArray: require('@kingjs/descriptor.nested.to-array'),
  update: require('@kingjs/descriptor.nested.update'),
  forEach: require('@kingjs/descriptor.nested.for-each')
}

var thisArg = { };
var descriptor = { x:0 };

// merge theory; undefined target is always overwritten
assertTheory(function thisArgCallbackTest(test, id) {
}, { 
  // filter
  // map
  // write(key, value)

  // merge
  // reduce
  // update
  // nested.for-each
  // nested.merge
  // nested.reduce
  // nested.update
});

assertTheory(function thisArgCallbackTest(test, id) {
  var called = false;
  var callback = function(value, name) {
    assert(thisArg == this);
    called = true;
  };

  var meta = normalize(test.meta, 'func');
  var ctx = Object.create(meta.ctx || descriptor);
  
  var args = (meta.args || []).slice();
  args.push(callback);
  args = args.concat(meta.afterCallbackArgs || []);
  args.push(thisArg);

  // args => this, [arguments..., callback, this]

  meta.func.apply(ctx, args);
  
  assert(called);
}, {
  meta: [
    {
      func: nested.forEach,
      ctx: null,
      args: [{ x:0 }, { x: null }],
    }, 
    {
      func: nested.merge,
      ctx: null,
      args: [0, 1],
    }, 
    {
      func: nested.reduce,
      ctx: null,
      args: [{ }, { x:0 }],
      afterCallbackArgs: [null]
    }, 
    {
      func: nested.update,
      args: [0, null]
    }, 
    filter,
    map, 
    mapNames,
    {
      func: merge,
      args: [{ x:1 }]
    }, 
    {
      func: reduce,
      args: [{ }]
    },
    update,
  ]
})