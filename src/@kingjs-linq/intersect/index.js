var { 
  ['@kingjs']: {
    reflect: { 
      implementIEnumerable,
      exportExtension
    },
    Dictionary,
    IEnumerable,
    IEnumerable: { GetEnumerator },
    IEnumerator: { MoveNext, Current }
  }
} = module[require('@kingjs-module/dependencies')]();
 
function defaultSelector(x) {
  return x;
}

/**
 * @description Generates the set intersection of two sequences.
 * 
 * @param {*} second 
 * @param {*} idSelector 
 */
function intersect(
  second,
  idSelector) {
  var first = this;

  return implementIEnumerable({ }, 
    function createMoveNext() {
      if (!idSelector)
        idSelector = defaultSelector;

      var firstEnumerator = first[GetEnumerator]();
      var secondEnumerator = second[GetEnumerator]();
      
      var set;
      
      return function moveNext() {

        if (!set)
          set = new Dictionary();
        
        if (secondEnumerator) {
          while (secondEnumerator[MoveNext]())
            set[idSelector(secondEnumerator[Current])] = undefined;
            secondEnumerator = null;
        }
        
        while (firstEnumerator[MoveNext]()) {
          var current = firstEnumerator[Current];
          var id = idSelector(current);
          if (!(id in set))
            continue;
          
          // skip future duplicates
          delete set[id];

          this.current_ = current;
          return true;
        }

        return false;
      }
    }
  )
};

exportExtension(module, IEnumerable, intersect);
