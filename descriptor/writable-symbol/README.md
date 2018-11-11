# @[kingjs](https://www.npmjs.com/package/kingjs)/[descriptor](https://www.npmjs.com/package/@kingjs/descriptor).writable-symbol
Symbol whose presence indicates a descriptor is mutable.
## Usage
```js
var writableSymbol = require('@kingjs/descriptor.writable-symbol');
typeof writableSymbol;
```
result:
'symbol'
## API
### Interfaces
- `Descriptor`: see [@kingjs/descriptor][descriptor]
## Remarks
Object and Array literals are considered immutable by descriptor APIs because those objects are created without `writable-symbol`. 

`write`, `clone`, and `remove`, will return descriptors with `writable-symbol` set to `undefined`. 

`freeze` will delete `writable-symbol`.

`isFrozen` will test for `writable-symbol`.

All other descriptor APIs that return a descriptor will not have `writable-symbol` set. 
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/descriptor.writable-symbol
```
## License
MIT

![Analytics](https://analytics.kingjs.net/descriptor/writable-symbol)


  [descriptor]: https://www.npmjs.com/package/@kingjs/descriptor