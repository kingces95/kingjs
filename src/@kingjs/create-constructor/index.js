var { 
  assert,
  ['@kingjs']: { reflect: { is } } 
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Create a constructor from a base 
 * function and a body function.
 */
function createConstructor(name, base, body) {
  assert(is.string(name))
  assert(!base || is.function(base))
  assert(!body || is.function(body))

  var constructor = function() {

    if (base)
      base.apply(this, arguments)

    if (body)
      body.apply(this, arguments)
  }
  
  Object.defineProperty(constructor, 'name', {
    enumerable: true,
    value: name
  })

  if (body && !body.name) {
    Object.defineProperty(body, 'name', {
      enumerable: true,
      value: `${name} (ctor)` 
    })
  }

  if (base) {
    constructor.prototype = Object.create(base.prototype)
    Object.defineProperty(constructor.prototype, 'constructor', {
      value: constructor
    })
  }
  
  return constructor
}

Object.defineProperties(module, {
  exports: { value: createConstructor }
})