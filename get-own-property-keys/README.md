# @[kingjs][@kingjs]/[get-own-property-keys][ns0]
Returns own property names and symbols in an array.
## Usage
```js
var assert = require('assert');
var getOwnPropertyKeys = require('@kingjs/get-own-property-keys');

var symbol = Symbol();
var name = 'name';

var keys = getOwnPropertyKeys.call({ 
  [symbol]: null,
  [name]: null
});

assert.deepEqual(keys, [name, symbol]);
```

## API
```ts
getOwnPropertyKeys(this)
```
### Parameters
- `this`: The object whose own property names and symbols will be returned.
### Returns
Returns own property names and symbols in an array.

## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/get-own-property-keys
```
## Source
https://repository.kingjs.net/get-own-property-keys
## License
MIT

![Analytics](https://analytics.kingjs.net/get-own-property-keys)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/get-own-property-keys
