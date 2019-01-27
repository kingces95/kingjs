# @[kingjs][@kingjs]/[property-descriptor][ns0].[target-instance-of][ns1]
Add a precondition to an accessor or function descriptor  which throws unless `this` at runtime is an `instanceof` a specific type.
## Usage
```js
var assert = require('assert')
var targetInstanceOf = require('@kingjs/property-descriptor.target-instance-of');

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

```

## API
```ts
targetInstanceOf(this, callback(parameters)[, name])
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
$ npm install @kingjs/property-descriptor.target-instance-of
```
## Source
https://repository.kingjs.net/property-descriptor/target-instance-of
## License
MIT

![Analytics](https://analytics.kingjs.net/property-descriptor/target-instance-of)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/property-descriptor
[ns1]: https://www.npmjs.com/package/@kingjs/property-descriptor.target-instance-of