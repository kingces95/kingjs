var { 
  ['@kingjs']: {
    reflect: { 
      implementIEnumerable,
      exportExtension
    },
    IEnumerable,
    IEnumerable: { GetEnumerator },
    IEnumerator: { MoveNext, Current }
  }
} = require('./dependencies');

/**
 * @description Generates a sequence of elements composed 
 * of elements of two sequences which share the same index.
 * 
 * @param {*} other 
 * @param {*} result 
 */
function zip(other, result) {
  var source = this;

  return implementIEnumerable({ }, 
    function makeMoveNext() {
      var first = source[GetEnumerator]();
      var second = other[GetEnumerator]();
      
      return function() {    
        if (!first[MoveNext]() || 
          !second[MoveNext]())
          return false;
        
        this.current_ = result(
          first[Current], 
          second[Current]);
        return true;
      }
    }
  )
};

exportExtension(module, IEnumerable, zip);
