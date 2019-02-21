
var assert = require('assert');
var assertTheory = require('@kingjs/assert-theory');

var filter = require('@kingjs/descriptor.filter');
var inherit = require('@kingjs/descriptor.inherit');
var merge = require('@kingjs/descriptor.merge');
var normalize = require('@kingjs/descriptor.normalize');
var reduce = require('@kingjs/descriptor.reduce');
var remove = require('@kingjs/descriptor.remove');
var scorch = require('@kingjs/descriptor.scorch');
var update = require('@kingjs/descriptor.update');
var write = require('@kingjs/descriptor.write');

var nested = {
  merge: require('@kingjs/descriptor.nested.merge'),
  reduce: require('@kingjs/descriptor.nested.reduce'),
  toArray: require('@kingjs/descriptor.nested.to-array'),
  update: require('@kingjs/descriptor.nested.update'),
  forEach: require('@kingjs/descriptor.nested.for-each')
}

var thisArg = { };
var descriptor = { x:0 };

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