'use strict';

var objectEx = require('@kingjs/object-ex');

var { load, loader, resolve } = require('@kingjs/loader');
var IEnumerable = load('IEnumerable');
var IEnumerator = load('IEnumerator');

var PackageName = '@kingjs/linq';

var linq = resolve(PackageName);
if (!linq)
  linq = loader.addPackage(PackageName);

exports.getEnumerator = IEnumerable.getEnumerator;
exports.moveNext = IEnumerator.moveNext;
exports.current = IEnumerator.current;
exports.define = function(target, name, func) {
  var extension = linq.addMethod(
    func.name, {
      extends: IEnumerable,
      func: func
    }
  )

  objectEx.defineField(target, name, extension.id);
}

