'use strict';

var prolog = require('@kingjs/descriptor.object.prolog');
var epilog = require('@kingjs/descriptor.object.epilog');
var clone = require('@kingjs/descriptor.object.clone');
var update = require('@kingjs/descriptor.nested.update');

var resolveAndSelect = require('./resolveAndSelect');

var star = '*';

function simpleLoad(refs) {
  prolog.call(this);

  var result;

  for (var name in this) {
    
    var paths; 
    if (name in refs)
      paths = refs[name];
    else if (star in refs)
      paths = refs[star];
    else
      continue;

    if (!result)
      result = clone.call(this);

    result[name] = update(
      this[name],
      paths,
      resolveAndSelect,
      this
    )
  }

  return epilog.call(result || this);
}

Object.defineProperties(module, {
  exports: { value: simpleLoad }
});