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
 * @description Generates a sequence identical to another sequence 
 * after bypassing a specified number of elements.
 * 
 * @param {*} count 
 */
function skip(count) {
  var source = this;

  return implementIEnumerable({ }, 
    function createMoveNext() {
      var enumerator = source[GetEnumerator]();
      
      return function moveNext() {    
        
        do {      
          if (!enumerator[MoveNext]())
            return false;
        } while (count-- > 0);
        
        this.current_ = enumerator[Current];
        return true;
      }
    }
  );
};

exportExtension(module, IEnumerable, skip);
