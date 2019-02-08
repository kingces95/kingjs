var {
  ['@kingjs']: {
    reflect: { implementInterface },
    IEnumerable,
    IEnumerator,
  }
} = require('./dependencies');

/**
 * @description Implements `IEnumerable` given a factory that, given
 * the container, returns a `moveNext` function.
 * 
 * @param target The instance on which to implement `IEnumerable`.
 * @param createMoveNext A factory that, given the container, returns
 * a `moveNext` function. `moveNext` should return `true` if more 
 * elements remain; otherwise `false`.
 * 
 * @returns `target`
 * 
 * @callback createMoveNext
 * @param this The enumerator. When a new value is generate it should
 * be stored in `this.current_`. 
 * @param instance The instance to enumerate.
 */
function implementIEnumerable(target, createMoveNext) {

  return implementInterface(target, IEnumerable, {
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

module.exports = implementIEnumerable;