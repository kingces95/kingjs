var copy = require('@kingjs/mutate.copy');
var Dictionary = require('@kingjs/dictionary');

function inherit(bases) {
  var target = this;

  if (!bases || bases.length == 0)
    return this;

  var values = new Dictionary();

  for (var i = 0; i < bases.length; i++) {
    var base = bases[i];

    // throw on ambiguous inherited values
    copy.call(values, base, function(name) {

      if (name in target)
        return true;

      if (values[name] == base[name])
        return true;

      throw '"Ambiguous value for property "' + name + '".';
    });
  }

  return copy.call(this, values, true);  
}

Object.defineProperties(module, {
  exports: { value: inherit }
});