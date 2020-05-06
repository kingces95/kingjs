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

function defaultCollectionSelector(x, i) {
  return x;
}

function defaultResultSelector(x, y) {
  return y;
}

/**
 * @description Generate a sequence by concatenating sequences 
 * projected from elements of a sequence.
 * 
 * @param {*} collectionSelector 
 * @param {*} resultSelector 
 */
function selectMany(
  collectionSelector,
  resultSelector
) {
  var source = this;

  return implementIEnumerable({ }, 
    function createMoveNext() {
      var enumerator = source[GetEnumerator]();
      var current;
      var manyEnumerator;
      var i = 0;

      if (!collectionSelector)
        collectionSelector = defaultCollectionSelector;

      if (!resultSelector)
        resultSelector = defaultResultSelector;
      
      return function moveNext() {
        while (true) {      
          if (manyEnumerator && manyEnumerator[MoveNext]())
            break;
          
          var manyEnumerable = null;
          if (!enumerator[MoveNext]()) 
            return false;

          current = enumerator[Current];
          manyEnumerable = collectionSelector(current, i++);
          manyEnumerator = manyEnumerable[GetEnumerator]();
        }

        this.current_ = resultSelector(current, manyEnumerator[Current]);
        return true;
      };
    }
  )
};

exportExtension(module, IEnumerable, selectMany);
