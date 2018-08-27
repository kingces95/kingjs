# @[kingjs](https://www.npmjs.com/package/kingjs)/[descriptor](https://www.npmjs.com/package/@kingjs/descriptor).path
Updates property values matched by a path.
## Usage
Deduct a dollar from the balances of every account like this:
```js
var mapPath = require('@kingjs/descriptor.path');

var accounts = {
  alice: {
    id: 0,
    balance: 101
  },
  bob: {
    id: 1,
    balance: 201
  }
}

mapPath.call(
  accounts,
  '*.balance',
  function(x) { return x - 1; }
)
```
result:
```js
{
  alice: {
    id: 0,
    balance: 100
  },
  bob: {
    id: 1,
    balance: 200
  }
}
```
## API
```ts
declare function path(
  this,
  path: string | string[],
  callback: (this, x) => any
): any
```
### Parameters
- `this`: The object whose property's values are updated.
- `path`: An array of property names and/or the wildcard `'*'` which specify the path(s) to map.
- `callback`: The update function to apply to each property that matches the path.
  - `this`: The same this as passed to `path` (which may not be the same as object hosting the property of the value being upated).
  - `x`: The value of the property being updated.
### Returns
Returns `this` after updating properties which matched `path`.
## Remarks
The `path` may also be a `'.'` delimited string composed of property names and/or the wildcard symbol `'*'`.
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/descriptor.path
```
## License
MIT

![Analytics](https://analytics.kingjs.net/descriptor/path)
