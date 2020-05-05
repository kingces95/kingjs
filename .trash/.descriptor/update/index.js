var {
  ['@kingjs']: { 
    descriptor: { nested: { update: nestedUpdate } } 
  }
} = module[require('@kingjs-module/dependencies')]()

var children = { '*': undefined };

function update(callback, thisArg) {
  return nestedUpdate(this, children, callback, thisArg);
}

Object.defineProperties(module, {
  exports: { value: update }
});