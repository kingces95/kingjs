var { assert,
  '@kingjs': { 
    '-reflect': { is, 
      descriptor: { rename } 
    }
  }
} = module[require('@kingjs-module/dependencies')]()

var unresolvedPromiseError = 'Promise returned undefined value.'
var undefinedTokenError = 'Cannot set token to undefined value.'
var derefBeforeAssignmentError = 'Unexpected dereference attempted before address assignment.'
var reseedError = 'Promise cannot be re-seeded.'

/**
 * @description Replaces a description of a function or accessor with 
 * a corresponding descriptor that delegates to the original descriptor
 * and caches its result in a corresponding property on `this`.
 * 
 * @this any A description of a get accessor or function. If neither, then
 * `get` is set to the identify function.
 * 
 * @param name The name of the property described by `this`.
 * @param [seeded] Allows a value to be set on the property which is passed
 * to the promise when the promise is fulfilled.
 * @param [seed] Modifies `seeded`. If no value is set before the 
 * promise is fulfilled then `seed` will be used as a default.
 * @param [isStatic] If true then the returned promise descriptor is
 * marked configurable. This allows the promise to replace itself as happens 
 * when the descriptor is defined on a target that is also the `this` at 
 * runtime.
 * 
 * @remarks - If the original descriptor returns `undefined` then the promise
 * is not fulfilled and may be tried again later. This allows the debugger to
 * evaluate a promise before it's ready to be fulfilled while allowing
 * fulfillment at the nominal time.
 * @remarks - The descriptor may not be writable nor have a set accessor.
 * @remarks - If the descriptor has a value, is must be a function.
 */
function makeLazy(name, seeded, seed, isStatic) {
  assert(is.stringOrSymbol(name))

  var hasValue = 'value' in this
  var hasSet = 'set' in this
  assert(!hasSet)

  var isFunction = hasValue || false
  var isConfigurable = this.configurable || false
  var isEnumerable = this.enumerable || false
  var isWritable = this.writable || false
  assert(!isWritable)

  var wrap = isFunction ? 'value' : 'get'
  var promise = this.value || this.get
  assert(is.function(promise))

  // normalize name assigned to functions
  var debugName = name
  if (is.symbol(debugName))
    debugName = Symbol.keyFor(debugName)

  function fulfillPromise(argument) {

    // delegate to original descriptor
    var result = promise.call(this, argument)
    assert(!is.undefined(result), unresolvedPromiseError)

    var descriptor = {
      configurable: isConfigurable,
      enumerable: isEnumerable,
      writable: isWritable,
      value: result
    }

    if (isFunction) {
      descriptor.value = () => result
      rename.call(result, debugName)
    }

    // cache result on this
    Object.defineProperty(this, name, descriptor)
    return result
  }

  if (!seeded) {
    this[wrap] = fulfillPromise
  } 

  else {
    delete this.value
    delete this.writable

    // deffer bindPromise until initialization
    this.get = function initializeAndFulfillPromise() {

      // initialize with default
      assert(!is.undefined(seed), derefBeforeAssignmentError)
      this[name] = seed

      // fulfill
      return this[name]
    }

    this.set = function initializePromise(value) {
      assert(!is.undefined(value), undefinedTokenError)      

      var descriptor = {
        configurable: true,
        enumerable: isEnumerable,
        [wrap]: function() {
          return fulfillPromise.call(this, value)
        }
      }

      if (!isFunction)
        descriptor.set = () => assert.fail(reseedError)

      rename.call(this, `${debugName} (promised)`)

      Object.defineProperty(this, name, descriptor)
    }   
  } 
  
  rename.call(this, `${debugName} (promised)`)

  if (isStatic)
    this.configurable = true

  return this
}

module.exports = makeLazy