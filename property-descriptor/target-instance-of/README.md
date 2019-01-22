# @[kingjs][@kingjs]/[property-descriptor][ns0].[target-instance-of][ns1]
Add a precondition to an accessor or function descriptor  which throws unless `this` at runtime is an `instanceof` a specific type.
## Usage
```js
/** @fileoverview extend the builtin String with a capitalize 
 * function like this:
 * */

var assert = require('assert')
var targetInstanceOf = require('@kingjs/property-descriptor.target-instance-of');

function capitalize() {
  var firstChar = this.charAt(0);

  // capitalize
  firstChar = firstChar.toUpperCase();
  
  var result = firstChar + this.substring(1, this.length);
  return result;
}

var Capitalize = Symbol(capitalize.name);

Object.defineProperty(
  Object.prototype,
  Capitalize,
  targetInstanceOf.call(
    { value: capitalize },
    () => String,
    Capitalize
  )
);

var test = 'foobar'[Capitalize]();
assert(test == 'Foobar');

var descriptor = Object.getOwnPropertyDescriptor(String.prototype, Capitalize);
assert(descriptor.value == capitalize);

assert.throws(() => [][Capitalize]());

```

## API
```ts
targetInstanceOf(this, callback()[, symbol])
```
### Parameters
- `this`: A descriptor describing an accessor or function.
- `callback`: Returns the type `this` must be an `instanceof` at runtime in order to access the property.

- `symbol`: The symbol of the property being described. If provided, `this` descriptor will be declared on the deepest prototype of the runtime  `this` for which is `instanceof` returns true.
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
