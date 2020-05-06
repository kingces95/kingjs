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
 * @description Generates a sequence of elements composed of 
 * elements from another sequences which satisfy a specified condition.
 * 
 * @param {*} predicate 
 */
function where(predicate) { 
  var source = this;

  return implementIEnumerable({ }, 
    function makeMoveNext() {
      var enumerator = source[GetEnumerator]();
      var i = 0;
      
      return function moveNext() {    
        while (true) {
          if (!enumerator[MoveNext]())
            return false;
          
          var current = enumerator[Current];
          if (!predicate(current, i++))
            continue;
          
          this.current_ = current;
          return true;
        }
      };
    }
  );
};

exportExtension(module, IEnumerable, where);
