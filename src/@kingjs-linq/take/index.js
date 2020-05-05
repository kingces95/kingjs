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
 * @description Generates a sequence identical to 
 * another sequence up to a specified index.
 * 
 * @param {*} count 
 */
function take(count) {
  var source = this;

  return implementIEnumerable({ }, 
    function createMoveNext() {
      var enumerator = source[GetEnumerator]();
      
      return function moveNext() {    
        if (!enumerator[MoveNext]() || count-- <= 0)
          return false;
        
        this.current_ = enumerator[Current];
        return true;
      }
    }
  );
};

exportExtension(module, IEnumerable, take);
