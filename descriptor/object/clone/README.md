# @[kingjs](https://www.npmjs.com/package/kingjs)/[descriptor](https://www.npmjs.com/package/@kingjs/descriptor).[object](https://www.npmjs.com/package/@kingjs/descriptor.object).clone
Returns a mutable clone of a descriptor.
## Usage
```js
var clone = require('@kingjs/descriptor.object.clone');
var target = { x:0 };
clone.call(target);
```
result:
```js
{ x:0 }
```
## API
```ts
declare function clone(
  this: Descriptor
): any
```
### Interfaces
- `Descriptor`: see [@kingjs/descriptor][descriptor]
### Parameters
- `this`: The descriptor to clone.
### Returns
Returns a mutable clone of the descriptor.
## Remarks
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/descriptor.object.clone
```
## License
MIT

![Analytics](https://analytics.kingjs.net/descriptor/object/clone)


  [descriptor]: https://www.npmjs.com/package/@kingjs/descriptor