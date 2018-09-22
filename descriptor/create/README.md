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
  prototype?: Descriptor,
  alwaysCopy?: boolean
): any
```
### Interfaces
- `Descriptor`: see [@kingjs/descriptor][descriptor]
### Parameters
- `prototype`: The descriptor to clone.
- `alwaysCopy`: Always copy the properties from `prototype` onto a new object.
### Returns
A new descriptor or a shallow clone of every enumerable property on `prototype`.
## Remarks
If `prototype` is frozen, then a new object is created, otherwise `prototype` is used as the prototype for the new descriptor.
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/descriptor.create
```
## License
MIT

![Analytics](https://analytics.kingjs.net/descriptor/create)

  [descriptor]: https://www.npmjs.com/package/@kingjs/descriptor