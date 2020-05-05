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
} = module[require('@kingjs-module/dependencies')]();

/**
 * @description Concatenates two sequences.
 * 
 * @this any The first sequence to concatenate.
 * @param enumerable The second sequence to concatenate.
 * 
 * @returns An `IEnumerable` that contains the concatenated 
 * elements of the two input sequences.
 */
var concat = function concat(enumerable) {
  var firstEnumerable = this;
  var secondEnumerable = enumerable;

  return implementIEnumerable({ }, 
    function createMoveNext() { 
      var first = firstEnumerable[GetEnumerator]();
      var second = secondEnumerable[GetEnumerator]();

      return function moveNext() {
        if (first && first[MoveNext]()) {
          this.current_ = first[Current];
          return true;
        }
        first = undefined;

        if (second && second[MoveNext]()) {        
          this.current_ = second[Current];
          return true;
        }
        second = undefined;

        this.current_ = undefined;
        return false;
      }
    }
  );
};

exportExtension(module, IEnumerable, concat);
