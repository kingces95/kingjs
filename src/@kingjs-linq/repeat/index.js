var { 
  '@kingjs': {
    reflect: { 
      implementIEnumerable,
    }
  }
} = module[require('@kingjs-module/dependencies')]();

/**
 * @description Generate a sequence of a repeated value.
 * 
 * @param {*} element 
 * @param {*} count 
 */
function repeat(element, count) {  
  
  return implementIEnumerable({ }, 
    function createMoveNext() {
      return function moveNext() {
        
        if (count-- <= 0) {
          this.current_ = undefined;
          return false;
        }
        
        this.current_ = element;
        return true;
      }
    }
  )
}

module.exports = repeat;
