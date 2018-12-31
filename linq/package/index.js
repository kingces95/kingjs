'use strict';

var loader = require('@kingjs/loader');
var linq = loader.defineNamespace('@kingjs/linq');

var IEnumerable = linq.load('IEnumerable');
linq.extendEnumerable = function(func) {
  return this.defineMethod(func.name, {
    extends: IEnumerable,
    func: name
  }).id;
}

module.exports = linq;
