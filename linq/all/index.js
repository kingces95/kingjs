'use strict';

//var { load, loader } = require('@kingjs/loader');
var { load, loader } = require('../../loader');
var IEnumerable = load('IEnumerable');
var IEnumerator = load('IEnumerator');

var all = loader.addMethod(
  'all', {
    extends: IEnumerable,
    func: function all(predicate) {    
      var enumerator = this[IEnumerable.getEnumerator]();
      while (enumerator[IEnumerator.moveNext]()) {
        if (predicate && !predicate(enumerator[IEnumerator.current]))
          return false;
      }
      
      return true;
    }
  }
)

var object = {};

Object.defineProperties(module, {
  exports: { value: all.id }
});
