var { 
  '@kingjs': {
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
 * @description Generates a sequence of groups composed of 
 * elements of another sequence which share a common key.
 * 
 * @param {*} keySelector 
 * @param {*} elementSelector 
 * @param {*} resultSelector 
 */
function groupBy(
  keySelector,
  elementSelector,
  resultSelector) {
  var source = this;

  return implementIEnumerable({ }, 
    function createMoveNext() { 
      
      if (!elementSelector)
        elementSelector = defaultSelector;

      if (!resultSelector)
        resultSelector = defaultSelector;

      var enumerator = source[GetEnumerator]();
      var groupsEnumerator;
      
      return function moveNext() {
        
        if (enumerator) {
          var groups = [];
          var groupByKey = new Dictionary();
          
          while (enumerator[MoveNext]()) {
            var current = enumerator[Current];         
            var key = keySelector(current);
            
            var group = groupByKey[key];
            if (!group) {
              group = [];
              group.key = key;
              groupByKey[key] = group;
              groups.push(group);
            }
            
            group.push(elementSelector(current))
          }

          groupsEnumerator = groups[GetEnumerator]();
          enumerator = undefined;
        }
        
        if (!groupsEnumerator[MoveNext]())
          return false;
        
        var current = groupsEnumerator[Current];
        this.current_ = resultSelector(current);
        return true;
      }
    }
  );
};

exportExtension(module, IEnumerable, groupBy);
