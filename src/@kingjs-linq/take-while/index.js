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
 * sequence so long as the elements continue to satisfy 
 * a specified condition.
 * 
 * @param {*} predicate 
 */
function takeWhile(predicate) {
  var source = this;
  
  return implementIEnumerable({ }, 
    function createMoveNext() {
      var enumerator = source[GetEnumerator]();
      var i = 0; 
      
      return function moveNext() {    
        
        if (!enumerator[MoveNext]() || 
          !predicate || 
          !predicate(enumerator[Current], i++))
          return false;
        
        this.current_ = enumerator[Current];
        return true;
      };
    }
  )
};

exportExtension(module, IEnumerable, takeWhile);
