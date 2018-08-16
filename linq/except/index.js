'use strict';

var Dictionary = require('@kingjs/dictionary');
var defineGenerator = require('@kingjs/define-generator');

function defaultSelector(x) {
  return x;
}

function except(
  enumerable, 
  idSelector) {

  if (!idSelector)
    idSelector = defaultSelector;

  var enumerator = this.getEnumerator();
  var visited = new Dictionary();
  var exceptions;

  return function() { 

    while (true) {
      if (!enumerator.moveNext()) 
        return false;

      var value = enumerator.current;
      var id = idSelector(value);

      // exclude duplicates
      if (id in visited)
        continue;
      visited[id] = undefined;

      if (enumerable) {
        exceptions = new Dictionary();
        var exceptEnumerator = enumerable.getEnumerator();
        while (exceptEnumerator.moveNext())
          exceptions[idSelector(exceptEnumerator.current)] = undefined;

        // lazy exceptions population complete
        enumerable = null;
      }
      
      // exclude exceptions
      if (exceptions && id in exceptions)
        continue;
      
      this.current_ = value;
      return true;
    }
  }
};

Object.defineProperties(module, {
  exports: { value: defineGenerator(except) }
});