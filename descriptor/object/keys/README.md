# @[kingjs](https://www.npmjs.com/package/kingjs)/[descriptor](https://www.npmjs.com/package/@kingjs/descriptor).[object](https://www.npmjs.com/package/@kingjs/descriptor.object).keys
Returns an array of own and inherited enumerable property names.
## Usage
```js
var keys = require('@kingjs/descriptor.object.keys');

var base = { inherited: null };
var derived = Object.create(base);
derived.own = null;

var result = keys.call(derived);
result.sort();
result;
```
result:
```js
[ 'inherited', 'own' ]
```
## API
```ts
declare function keys(
  this: Descriptor
): any
```
### Interfaces
- `Descriptor`: see [@kingjs/descriptor][descriptor]
### Parameters
- `this`: The descriptor whose own and inherited property names will be returned.
### Returns
Returns an array containing the own and inherited enumerable property names of `this`.
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/descriptor.object.keys
```
## License
MIT

![Analytics](https://analytics.kingjs.net/descriptor/object/keys)

  [descriptor]: https://www.npmjs.com/package/@kingjs/descriptor
