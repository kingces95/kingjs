# @[kingjs](https://www.npmjs.com/package/kingjs)/[array](https://www.npmjs.com/package/@kingjs/array).[nested](https://www.npmjs.com/package/@kingjs/array.nested).to-array
Returns an array containing the non-array leafs of a tree whose internal nodes are nested arrays.
## Usage
Flatten nested arrays like this:
```js
var toArray = require('@kingjs/array.nested.toArray');

var result = toArray([
  'a', [
    'b', [
      'c'
    ], 'd'
  ], 'e'
]);

result;
```
result:
```js
[ 'a', 'b', 'c', 'd', 'e' ]
```
## API
```ts
declare function toArray(
  target: any | any[]
): any[]
```
### Parameters
- `target`: An non-array leaf or an array of nested array nodes interspersed with non-array leafs.
### Returns
Returns an array containing the non-array leafs of a tree whose internal nodes are nested arrays. 
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/array.nested.to-array
```
## License
MIT

![Analytics](https://analytics.kingjs.net/array.nested.to-array)

  [enumerable]: https://www.npmjs.com/package/@kingjs/enumerable