'use strict';

var merge = require('@kingjs/descriptor.merge');
var Dictionary = require('@kingjs/dictionary');
var takeLeft = require('@kingjs/func.return-arg-0');
var prolog = require('@kingjs/descriptor.object.prolog');
var epilog = require('@kingjs/descriptor.object.epilog');

function inherit(bases) {
  var target = prolog.call(this);

  if (!bases || bases.length == 0)
    return epilog.call(this);

  var values = new Dictionary();

  for (var i = 0; i < bases.length; i++) {
    var base = bases[i];

    // throw on ambiguous inherited values
    values = merge.call(values, base, function(left, right, name) {

      if (name in target)
        return left;

      if (values[name] == base[name])
        return left;

      throw '"Ambiguous value for property "' + name + '".';
    });
  }

  var result = merge.call(this, values, takeLeft, null);  
  return epilog.call(result);
}

Object.defineProperties(module, {
  exports: { value: inherit }
});