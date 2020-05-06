var { 
  '@kingjs': {
    reflect: { 
      implementIEnumerable,
      exportExtension
    },
    IEnumerable,
    IEnumerable: { GetEnumerator },
    IEnumerator: { MoveNext, Current }
  }
} = module[require('@kingjs-module/dependencies')]();

/**
 * @description Generates a sequence identical to another 
 * sequence after bypassing the first contiguous set of 
 * elements which satisfy a specified condition.
 * 
 * @param {*} predicate 
 */
function skipWhile(predicate) {
  var source = this;

  return implementIEnumerable({ }, 
    function createMoveNext() {
      var enumerator = source[GetEnumerator]();
      var i = 0;
      
      return function moveNext() {    
        do {      
          if (!enumerator[MoveNext]())
            return false;
        } while (predicate && predicate(enumerator[Current], i++));
        
        predicate = undefined;
        
        this.current_ = enumerator[Current];
        return true;
      }
    }
  )
};

exportExtension(module, IEnumerable, skipWhile);
