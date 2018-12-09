'use strict';

var assert = require('@kingjs/assert');

var onSetTag = Symbol('onSet')
var knownTags = {
  [onSetTag]: null
}

var noop = () => undefined;
var prototype = Object.create(null);
prototype[onSetTag] = noop; 

var propertyRedefinitionError = 'Property cannot be redefined.'
var deleteError = 'Property cannot be deleted.'

function stub(onGet) {
  var object = Object.create(prototype);
  Object.seal(object);

  var result = new Proxy(object, {
    get: function(target, key) {
      if (key in knownTags)
        return Reflect.set(...arguments);

      assert(key in receiver == false, propertyRedefinitionError);
      target[onSetTag](key, value);

      return Reflect.set(...arguments);
    },
  })

  if (onSet)
    result[onSetTag] = onSet;

  return result;
}

var children = create();
children[onSetTag] = (name, value) => console.log(name + '=' + value);

children['foo'] = 0;
children['bar'] = 1;
//children['bar'] = 1;
delete children.bar;

Object.defineProperties(module, {
  exports: { value: create }
});