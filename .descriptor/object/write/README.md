# @[kingjs](https://www.npmjs.com/package/kingjs)/[descriptor](https://www.npmjs.com/package/@kingjs/descriptor).[object](https://www.npmjs.com/package/@kingjs/descriptor.object).write
Writes a value to a descriptor, cloning descriptors if frozen. 
## Usage
Set a few properties on a descriptor like this.
```js
var write = require('@kingjs/descriptor.object.write');
var freeze = require('@kingjs/descriptor.object.freeze');
var isFrozen = require('@kingjs/descriptor.object.is-frozen');
  
function setAFewProperties(value) {

  // this will not clone value if foo is already 0
  value = write.call(value, 'foo', 0);

  // this will clone value if bar is not already 1
  value = write.call(value, 'bar', 1);

  // this call will not clone value if value was cloned above
  value = write.call(value, 'baz', 2);

  // value will have been cloned at most once

  // freeze value before exposing to users
  return freeze.call(value);
}

var target = { foo: 0 };

// target is born frozen
var bornFrozen = isFrozen.call(target);

setAFewProperties(target);
```
result:
```js
{
  foo: 0,
  bar: 1,
  baz: 2,
}
```
## API
```ts
declare function write(
  descriptor: Descriptor,
  name: string,
  value: any
): Descriptor
```
### Interfaces
- `Descriptor`: see [@kingjs/descriptor][descriptor]
### Parameters
- `this`: The descriptor whose property will be updated.
- `name`: The property to write.
- `value`: The updated value.
### Returns
Returns `this` or, if `this` is frozen, a clone of `this` with updated properties. 

Previously cloned values
returned by `write` will note be cloned by subsequent calls to `write`. Use [`isFrozen`][is-frozen] to test if a value has been previously cloned by write but not yet re-frozen via [`freeze`][freeze]. 

Use [`freeze`][freeze] to freeze any values which might have been cloned before returning them to the user.

Descriptor functions using this protocol in order that any descriptor passed as an argument are not mutated (see [`isFrozen`][is-frozen]) and to make immutable any descriptors returned (see [`freeze`][freeze]). This allows object and array literals to be passed to descriptor functions without having to be first frozen via `Object.freeze`.
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/descriptor.object.write
```
## License
MIT

![Analytics](https://analytics.kingjs.net/descriptor/object/write)

  [descriptor]: https://www.npmjs.com/package/@kingjs/descriptor
  [freeze]: https://www.npmjs.com/package/@kingjs/descriptor/object/freeze
  [is-frozen]: https://www.npmjs.com/package/@kingjs/descriptor/object/is-frozen