# @[kingjs](https://www.npmjs.com/package/kingjs)/[array](https://www.npmjs.com/package/@kingjs/array).[nested](https://www.npmjs.com/package/@kingjs/array.nested).for-each
Invokes a callback on leafs of a tree whose internal nodes are nested arrays and whose leafs are any non-array value.
## Usage
Flatten nested arrays like this:
```js
var forEach = require('@kingjs/array.nested.for-each');

var result = [];

forEach.call([
  'a', [
    'b', [
      'c'
    ], 'd'
  ], 'e'
], function(x) {
  result.push(x);
});

result;
```
result:
```js
[ 'a', 'b', 'c', 'd', 'e' ]
```
## API
```ts
declare function forEach(
  this: any | any[],
  action: (x) => void
)
```
### Parameters
- `this`: An non-array leaf or an array of nested array nodes interspersed with non-array leafs.
- `action`: Callback to invoke for each non-array element.
  - `x`: Current non-array leaf. 
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/array.nested.for-each
```
## License
MIT![Analytics](https://analytics.kingjs.net/array.nested.for-each)
