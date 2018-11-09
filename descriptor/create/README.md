# @[kingjs](https://www.npmjs.com/package/kingjs)/[descriptor](https://www.npmjs.com/package/@kingjs/descriptor).create
Returns a new descriptor or a shallow clone of an existing descriptor.
## Usage
Freeze person Chris and then update his age from 20 to 21. 
```js
'use strict';

var create = require('@kingjs/descriptor.create');

var frozenDescriptor = Object.freeze({ 
  name: 'Chris',
  age: 20
});

var clone = create.call(frozenDescriptor);
clone.age = 21;
clone;
```
result:
```js
{
  name: 'Chris',
  age: 21
}
```
## API
```ts
declare function create(
  prototype?: Descriptor
): any
```
### Interfaces
- `Dictionary`: see [@kingjs/dictionary][dictionary]
- `Descriptor`: see [@kingjs/descriptor][descriptor]
### Parameters
- `prototype`: The descriptor to clone.
### Returns
A new descriptor or a shallow clone of every enumerable property on `prototype`.
## Remarks
If `prototype` is an `Array` then the clone will be an `Array`, otherwise the clone will be a `Dictionary`.
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/descriptor.create
```
## License
MIT

![Analytics](https://analytics.kingjs.net/descriptor/create)

  [descriptor]: https://www.npmjs.com/package/@kingjs/descriptor
  [dictionary]: https://www.npmjs.com/package/@kingjs/dictionary