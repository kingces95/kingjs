# @[kingjs](https://www.npmjs.com/package/kingjs)/[descriptor](https://www.npmjs.com/package/@kingjs/descriptor).[object](https://www.npmjs.com/package/@kingjs/descriptor.object).remove
Returns a descriptor with a property removed.
## Usage
Remove the property 'x' like this:
```js
var remove = require('@kingjs/descriptor.object.remove');

var descriptor = { x:0 };
remove.call(descriptor, 'x');
```
result:
```js
{ }
```
## API
```ts
declare function remove(
  this: Descriptor,
  key: string
): Descriptor
```
### Interfaces
- `Descriptor`: see [@kingjs/descriptor][descriptor]
### Parameters
- `this`: The descriptor from which property `key` will be removed.
- `key`: The property to be removed.
### Returns
Returns a descriptor with property `key` removed. A copy is returned if the descriptor has an inherited property `key` or the descriptor is frozen. If `this` is an array then subsequent values are shifted left over the removed index.
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/descriptor.object.remove
```
## License
MIT

![Analytics](https://analytics.kingjs.net/descriptor/object/remove)

  [descriptor]: https://www.npmjs.com/package/@kingjs/descriptor