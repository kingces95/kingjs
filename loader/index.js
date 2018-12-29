'use strict';

var assert = require('@kingjs/assert');
var objectEx = require('@kingjs/object-ex');

var schema = require('./js/schema');

var Loader = schema.Loader;

var loader = new Loader(null, null, {
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
      Number: Number,
      Boolean: Boolean,
      Symbol: Symbol,
      Object: {
        func: Object,
        methods: { 
          [Loader.infoSymbol]: function() { 
            return Loader.getInfo(this);
          } 
        }
      },
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
          indexable_: { readOnly: true },
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

var IndexableEnumerator = loader.children.IndexableEnumerator.load();

for (var name in loader.children) {
  var type = loader.children[name];
  if (!type.isNative)
    continue;

  type.load();
  objectEx.defineStaticField(Loader, name, type);
}

Object.defineProperties(module, {
  exports: { 
    value: function(name) {
      return loader.load(name);
    } 
  }
});

return;

var load = module.exports;

assert(loader.resolve('Object') == Loader.Object);
assert(loader.resolve(Object) == Loader.Object);
assert(Object[Loader.infoSymbol] == Loader.Object);

assert(Loader.Array.base == Loader.Object);
assert(Array[Loader.infoSymbol] == Loader.Array);
assert(Loader.Array.canCastTo(loader.children.IEnumerable));

assert(load() == loader);
var IEnumerable = load('IEnumerable');
var IEnumerator = load('IEnumerator');

var array = [42];
var enumerator = array[IEnumerable.getEnumerator]();
assert(enumerator[IEnumerator.moveNext]());
assert(enumerator[IEnumerator.current] == 42);
assert(!enumerator[IEnumerator.moveNext]());

var str = '4';
var enumerator = str[IEnumerable.getEnumerator]();
assert(enumerator[IEnumerator.moveNext]());
assert(enumerator[IEnumerator.current] == '4');
assert(!enumerator[IEnumerator.moveNext]());
