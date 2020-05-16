var { assert,
  '@kingjs': { 
    '-interface': { IIterable },
    '-target-instance-of': { targetInstanceOf },
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @this String The string to capitalize.
 * 
 * @returns A capitalized version of @this.
 */
function capitalize() {
  var firstChar = this.charAt(0);

  // capitalize
  firstChar = firstChar.toUpperCase();
  
  var result = firstChar + this.substring(1, this.length);
  return result;
}

// use a symbol instead of a name so as not to pollute builtin
// types with properties that may collied with other frameworks
var Capitalize = Symbol(capitalize.name);

// extend String with capitalize
Object.defineProperty(
  Object.prototype,
  Capitalize,
  targetInstanceOf.call(
    { value: capitalize },
    () => String,
    Capitalize
  )
);

// call capitalize on a string
var test = 'foobar'[Capitalize]();
assert(test == 'Foobar');

// note that capitalize has been added to String.prototype (even 
// though we originally defined capitalize on Object.prototype). 
var descriptor = Object.getOwnPropertyDescriptor(String.prototype, Capitalize);
assert(descriptor.value == capitalize);

// cannot capitalize an array! The stub has detected the type of
// `this`, being an `Array`, is not an instanceof `String` and so 
// throws. Its derivation by restriction!
assert.throws(() => [][Capitalize]());

// Extending an interface is also supported. For example, extend IIterable 
// with Any() like this:
var Any = Symbol('Any');
var descriptor = { 
  value: function() { 
    return !this[IIterable.getIterator]().next().done 
  },
};
Object.defineProperty(
  Object.prototype,
  Any,
  targetInstanceOf.call(
    descriptor, 
    () => IIterable, 
    Any
  )
);
assert(!String.prototype[Any]());
assert(''[Any]() == false);
assert('.'[Any]() == true);

assert(!Array.prototype[Any]());
assert([0][Any]() == true);
assert([][Any]() == false);