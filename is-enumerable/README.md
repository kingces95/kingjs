# @[kingjs](https://www.npmjs.com/package/kingjs)/is-enumerable
Returns true if own or inherited property is enumerable.
## Usage
Test if an inherited override of `toString` is enumerable like this:
```js
var isEnumerable = require('@kingjs/is-enumerable');

isEnumerable.call(Object.create({ toString: null }), 'toString');
```
result:
```js
true
```
## API
```ts
declare function isEnumerable(
  this,
  name: string
): boolean
```
### Parameters
- `this`: The object to test for an enumerable property.
- `name`: The property name to test.
### Returns
Returns `true` if the own or inherited property `name` exists and is enumerable, otherwise `false`.
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/is-enumerable
```
## License
MIT

![Analytics](https://analytics.kingjs.net/is-enumerable)