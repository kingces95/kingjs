var { 
  '@kingjs': {
    reflect: { 
      implementIEnumerable,
    }
  }
} = module[require('@kingjs-module/dependencies')]();

/**
 * @description Generate a range of numbers.
 * 
 * @param {*} start 
 * @param {*} count 
 */
function range(start, count) {
  
  return implementIEnumerable({ }, 
    function createMoveNext() {
      return function moveNext() {
        
        if (count-- <= 0) {
          this.current_ = undefined;
          return false;
        }
        
        this.current_ = start++;
        return true;
      }
    }
  );
};

module.exports = range;
