'use strict';

var schema = require('./schema');

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

// load native types
for (var name in loader.children) {
  var type = loader.children[name];
  if (!type.isNative)
    continue;

  type.load();
}

exports.loader = loader;
exports.info = loader.infoSymbol;
exports.load = name => loader.load(name);
exports.resolve = name => loader.resolve(name);
