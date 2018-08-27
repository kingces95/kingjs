var merge = require('@kingjs/descriptor.merge');
var Dictionary = require('@kingjs/dictionary');
var takeLeft = require('@kingjs/func.return-arg-0');

function inherit(bases) {
  var target = this;

  if (!bases || bases.length == 0)
    return this;

  var values = new Dictionary();

  for (var i = 0; i < bases.length; i++) {
    var base = bases[i];

    // throw on ambiguous inherited values
    merge.call(values, base, function(left, right, name) {

      if (name in target)
        return left;

      if (values[name] == base[name])
        return left;

      throw '"Ambiguous value for property "' + name + '".';
    });
  }

  return merge.call(this, values, takeLeft);  
}

Object.defineProperties(module, {
  exports: { value: inherit }
});