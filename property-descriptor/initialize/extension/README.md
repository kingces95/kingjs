# @[kingjs][@kingjs]/[property-descriptor][ns0].[initialize][ns1].[extension][ns2]
Lazily declare an accessor or function  but only for specific polymorphic types.
## Usage
```js
var assert = require('assert')
var initializeExtension = require('@kingjs/property-descriptor.initialize.extension');

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
  initializeExtension.call(
    { value: capitalize },
    Capitalize,
    () => String
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
extension(this, name, callback())
```
### Parameters
- `this`: A descriptor describing an accessor or function.
- `name`: The symbol of the property being described.
- `callback`: Returns a type `this` must be polymorphic with before patching the definition.

### Returns
A descriptor whose accessors or function has been replaced with a stub which checks that `this` is polymorphic with the extended type before patching and invoking the accessor or function.

## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/property-descriptor.initialize.extension
```
## Source
https://repository.kingjs.net/property-descriptor/initialize/extension
## License
MIT

![Analytics](https://analytics.kingjs.net/property-descriptor/initialize/extension)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/property-descriptor
[ns1]: https://www.npmjs.com/package/@kingjs/property-descriptor.initialize
[ns2]: https://www.npmjs.com/package/@kingjs/property-descriptor.initialize.extension
