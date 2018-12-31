'use strict';

var objectEx = require('@kingjs/object-ex');

var { load, loader, resolve } = require('@kingjs/loader');
var { getEnumerator } = load('IEnumerable');
var { moveNext, current } = load('IEnumerator');

var PackageName = '@kingjs/linq';

var linq = resolve(PackageName) || loader.addPackage(PackageName);

exports.getEnumerator = getEnumerator;
exports.moveNext = moveNext;
exports.current = current;
exports.define = function(target, name, func) {
  var extension = linq.defineMethod(
    func.name, {
      extends: IEnumerable,
      func: func
    }
  )

  objectEx.defineField(target, name, extension.id);
}