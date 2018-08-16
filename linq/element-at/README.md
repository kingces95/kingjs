# @[kingjs](https://www.npmjs.com/package/kingjs)/[linq](https://www.npmjs.com/package/@kingjs/linq).element-at
Returns the element at a specified index in a sequence.
## Usage
Return the 2nd element in the sequence `0`, `1`, `2` like this:
```js
var elementAt = require('@kingjs/linq.element-at');
var sequence = require('@kingjs/sequence');

elementAt.call(sequence(0, 1, 2), 1);
```
result:
```js
1
```

## API
```ts
declare function elementAt(
  this: Enumerable,
  index: number
): any
```
### Interfaces
- `Enumerable`: See [@kingjs/sequence](https://www.npmjs.com/package/@kingjs/sequence).

### Parameters
- `this`: The sequence to traverse.
- `index`: The 0 based index of of the sequence to return.

### Return Value
The 0 based index of of the sequence or an exception if the sequence is too short.

## Install
With [npm](https://npmjs.org/) installed, run

```
$ npm install @kingjs/linq.element-at
```
## See Also
Like [Enumerable.ElementAt](https://msdn.microsoft.com/en-us/library/bb299233(v=vs.110).aspx).

## License

MIT

![Analytics](https://analytics.kingjs.net/linq/element-at)