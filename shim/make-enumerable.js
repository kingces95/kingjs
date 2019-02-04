var {
  ['@kingjs']: {
    implementInterface
  }
} = require('./dependencies');

var { 
  IEnumerable, 
  IEnumerator,
} = Symbol.kingjs;

function makeEnumerable(target, createMoveNext) {

  implementInterface(target, IEnumerable, {
    methods: {
      getEnumerator: function() {
        var instance = this;
        var stillMoving = true;
        var moveNextFunc = null;
    
        return implementInterface({ }, IEnumerator, {
          accessors: {
            current: 'this.current_'
          },
          methods: {
            moveNext: function() {
              if (!moveNextFunc)
                moveNextFunc = createMoveNext(instance);
    
              stillMoving = stillMoving && moveNextFunc.call(this);
              if (!stillMoving)
                this.current_ = undefined;
    
              return stillMoving;
            }  
          }
        })
      }
    }
  });
}

module.exports = makeEnumerable;