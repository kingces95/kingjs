# @[kingjs](https://www.npmjs.com/package/kingjs)/[descriptor](https://www.npmjs.com/package/@kingjs/descriptor).object
Exports all `@kingjs/descriptor.object.*` functionality in one package.
## Usage
```js
var descriptor = require('@kingjs/descriptor.object');
```
## Packages
The functions `clone`, `remove`, and `write` will not re-freeze descriptors before returning them and should be used to implement descriptor transforms. The functions `prolog` and `epilog` should be used by descriptor transforms to assert the precondition that the descriptor is frozen, and establish the postcondition that the descriptor is frozen by calling `freeze` on any thawed descriptor returned by `clone`, `remove`, and/or `write`. 

- [`clone`][clone]
- [`epilog`][clone]
- [`freeze`][freeze]
- [`isFrozen`][is-frozen]
- [`keys`][keys]
- [`prolog`][prolog]
- [`remove`][remove]
- [`writableSymbol`][writable-symbol]
- [`write`][write]

## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/descriptor.object
```
## License
MIT

![Analytics](https://analytics.kingjs.net/descriptor/object)

  [dictionary]: https://www.npmjs.com/package/@kingjs/dictionary

  [clone]: https://www.npmjs.com/package/@kingjs/descriptor.object.clone
  [epilog]: https://www.npmjs.com/package/@kingjs/descriptor.object.epilog
  [freeze]: https://www.npmjs.com/package/@kingjs/descriptor.object.freeze
  [is-frozen]: https://www.npmjs.com/package/@kingjs/descriptorobject..is-frozen
  [keys]: https://www.npmjs.com/package/@kingjs/descriptor.object.keys
  [prolog]: https://www.npmjs.com/package/@kingjs/descriptor.object.prolog
  [remove]: https://www.npmjs.com/package/@kingjs/descriptor.object.remove
  [writable-symbol]: https://www.npmjs.com/package/@kingjs/descriptor.object.writable-symbol
  [write]: https://www.npmjs.com/package/@kingjs/descriptor.object.write
