var {
  ['@kingjs']: { 
    descriptor: { nested: { update: nestedUpdate } } 
  }
} = require('./dependencies')

var children = { '*': undefined };

function update(callback, thisArg) {
  return nestedUpdate(this, children, callback, thisArg);
}

Object.defineProperties(module, {
  exports: { value: update }
});