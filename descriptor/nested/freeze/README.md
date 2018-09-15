# @[kingjs](https://www.npmjs.com/package/kingjs)/[descriptor](https://www.npmjs.com/package/@kingjs/descriptor).[nested](https://www.npmjs.com/package/@kingjs/descriptor.nested).to-array
Freezes a tree of descriptors marked with property `$freeze` and removes the property.
## Usage
Freeze a tree of descriptors like this:
```js
'use strict';

var freeze = require('@kingjs/descriptor.nested.freeze');

var values = {        $freeze = true,
  alice: {            $freeze = true,
    pet: 'tiger' 
  },
  bob: {              $freeze = true,
    pet: 'snuggles' 
  },
  chris: {            $freeze = true,
    pet: 'spike'
  },
}

var result = freeze(values);
```
result:
```js
{
  alice: {
    pet: 'tiger' 
  },
  bob: {
    pet: 'snuggles' 
  },
  chris: {
    pet: 'spike'
  }
}
```
## API
```ts
declare function freeze(
  tree: NestedDescriptor
): void
```
### Interfaces
- `NestedDescriptor`: see [@kingjs/descriptor/nested][nested-descriptor]
### Parameters
- `tree`: A descriptor tree whose nodes marked with `$freeze` are frozen.
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/descriptor.nested.freeze
```
## License
MIT

![Analytics](https://analytics.kingjs.net/descriptor/nested/freeze)

  [nested-descriptor]: https://www.npmjs.com/package/@kingjs/descriptor/nested