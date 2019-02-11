# @[kingjs][@kingjs]/[reflect][ns0].[descriptor][ns1].[target-instance-of][ns2]
Add a precondition to an accessor or function descriptor  which throws unless `this` at runtime is an `instanceof` a specific type.
## Usage
```js
var assert = require('assert')
var IIterable = require('@kingjs/i-iterable');
var targetInstanceOf = require('@kingjs/reflect.descriptor.target-instance-of');

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
```

## API
```ts
targetInstanceOf(this, callback()[, name])
```

### Parameters
- `this`: A descriptor describing an accessor or function.
- `callback`: Returns the type `this` must be an `instanceof` at runtime in order to access the property.
- `name`: The name of the property being described. If provided, `this` descriptor will be declared on the deepest prototype of the runtime  `this` for which is `instanceof` returns true.
### Returns
A descriptor whose accessors or function throws at runtime unless `this` at runtime is an `instanceof` the type return by `callback`.


## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/reflect.descriptor.target-instance-of
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/reflect.is`](https://www.npmjs.com/package/@kingjs/reflect.is)|`^1.0.0`|
|[`@kingjs/reflect.descriptor.rename`](https://www.npmjs.com/package/@kingjs/reflect.descriptor.rename)|`^1.0.0`|
## Source
https://repository.kingjs.net/reflect/descriptor/target-instance-of
## License
MIT

![Analytics](https://analytics.kingjs.net/reflect/descriptor/target-instance-of)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/reflect
[ns1]: https://www.npmjs.com/package/@kingjs/reflect.descriptor
[ns2]: https://www.npmjs.com/package/@kingjs/reflect.descriptor.target-instance-of
