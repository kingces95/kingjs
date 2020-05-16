'use strict';

var schema = require('./schema');

var Namespace = schema.Namespace;

var loader = new Namespace();

var { info } = loader.defineInterface(
  'IReflectable', { accessors: { info: null } }
).load();

loader.defineChildren({
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
        accessor: { 
          [info]: function() { 
            var constructor = this.constructor;
            if (!constructor)
              return undefined;
    
            return constructor[info];
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
          current: undefined,
          indexable_: { readOnly: true },
        },
        accessors: {
          current: 'this.current'
        },
        methods: {
          moveNext: function() {
            var indexable = this.indexable_;
            var index = this.index_ + 1;
            if (index == indexable.length) {
              this.current = undefined;
              return false;
            }
      
            this.current = indexable[index];
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

module.exports = loader;