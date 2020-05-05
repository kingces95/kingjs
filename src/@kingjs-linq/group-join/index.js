var { 
  ['@kingjs']: {
    reflect: { 
      implementIEnumerable,
      exportExtension
    },
    linq: {
      ToLookup,
      empty
    },
    IEnumerable,
    IEnumerable: { GetEnumerator },
    IEnumerator: { MoveNext, Current }
  }
} = module[require('@kingjs-module/dependencies')]();

/**
 * @description Generates a sequence of elements composed 
 * of an element in one sequence and a group of elements 
 * in another sequence all of which share a common key.
 * 
 * @param {*} innerEnumerable 
 * @param {*} outerKeySelector 
 * @param {*} innerKeySelector 
 * @param {*} resultSelector 
 */
function groupJoin(
  innerEnumerable, 
  outerKeySelector, 
  innerKeySelector, 
  resultSelector) {

  var outerEnumerable = this;

  return implementIEnumerable({ }, 
    function createMoveNext() { 
      var innerLookup = innerEnumerable[ToLookup](innerKeySelector);
      var outerEnumerator = outerEnumerable[GetEnumerator]();

      return function moveNext() { 
        
        if (!outerEnumerator[MoveNext]()) {
          innerLookup = undefined;
          outerEnumerator = undefined;
          return false;
        }

        var outerElement = outerEnumerator[Current];
        var key = outerKeySelector(outerElement);
        var innerSequence = innerLookup[key] || empty();
        this.current_ = resultSelector(outerElement, innerSequence);
        return true;
      }
    }
  );
};

exportExtension(module, IEnumerable, groupJoin);
