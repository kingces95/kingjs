'use strict';

var assert = require('@kingjs/assert');
var is = require('@kingjs/is');
var objectEx = require('@kingjs/object-ex');
var Node = require('../node');
var schema = require('./schema');

var JavascriptNode = schema.JavascriptNode;
var Loader = schema.Loader;

var builtIn = new Loader(null, null, {
  interfaces: {
    IEnumerable: { 
      methods: { getEnumerator: null }
    },
    IEnumerator: {
      methods: { moveNext: null },
      accessors: { current: null }
    }
  },
  classes: [{
      $defaults: {
        primitive: true,
        native: true,
        base: null,
      },
      Object: Object,
      Number: Number,
      Boolean: Boolean,
      Symbol: Symbol,
    }, {
      $defaults: {
        native: true,
        base: 'Object',
        implements: [ 'IEnumerable' ],
        methods: {
          ['IEnumerable.getEnumerator']: function() {
            return new IndexableEnumerator(this);
          }        
        }
      },
      String: String,
      Array: Array
    }, {
      $defaults: {
        base: 'Object',
        implements: [ 'IEnumerator' ]
      },
      IndexableEnumerator: {
        func: function(indexable) { this.indexable_ = indexable },
        fields: {
          index_: -1,
          current_: undefined,
          array_: undefined,
        },
        accessors: {
          current: 'this.current_'
        },
        methods: {
          moveNext: function() {
            var indexable = this.indexable_;
            var index = this.index_ + 1;
            if (index == indexable.length) {
              this.current_ = undefined;
              return false;
            }
      
            this.current_ = indexable[index];
            this.index_ = index;
            return true;
          }
        }
      }
    }
  ],
});

var IndexableEnumerator = builtIn.children.IndexableEnumerator.load();

objectEx.defineFunction(JavascriptNode.prototype, 
  function resolve(ref) {
    if (ref instanceof JavascriptNode)
      return ref;
      
    if (is.function(ref))
      return ref[Loader.infoSymbol];

    return Node.prototype.resolve.call(this, ref);
  }
);

objectEx.defineStaticField(Loader, 'builtIn', builtIn);

for (var name in builtIn.children) {
  var type = builtIn.children[name];
  if (!type.isNative)
    continue;

  type.load();
  objectEx.defineStaticField(Loader, name, type);
}

Object.defineProperties(module, {
  exports: { value: builtIn }
});

assert(builtIn.resolve('Object') == Loader.Object);
assert(builtIn.resolve(Object) == Loader.Object);
assert(Loader.Array.base == Loader.Object);
assert(Array[Loader.infoSymbol] == Loader.Array);
assert(Loader.Array.canCastTo(builtIn.children.IEnumerable));

var IEnumerable = builtIn.resolve('IEnumerable').load();
var IEnumerator = builtIn.resolve('IEnumerator').load();
var array = [42];
var enumerator = array[IEnumerable.getEnumerator]();
assert(enumerator[IEnumerator.moveNext]());
//assert(enumerator[IEnumerator.current] == 42);
