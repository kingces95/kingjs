# @[kingjs](https://www.npmjs.com/package/kingjs)/[linq](https://www.npmjs.com/package/@kingjs/linq).range
Generate a range of numbers.
## Usage
Generate a range of 3 numbers starting at `1`.

```js
var range = require('@kingjs/linq.range');
var toArray = require('kingjs/linq.to-array');

toArray.call(range(1, 3));
```

result:
```js
[1, 2, 3]
```

## API
```ts
function range(
  start: number, 
  count: number
): Enumerable
```
### Interfaces
- `Enumerable`: See [@kingjs/enumerable.define](https://www.npmjs.com/package/@kingjs/enumerable.define).

### Parameters
- `start`: Number at which to start sequence.
- `count`: Values in sequence.

### Return Value
A sequence of `count` incrementing numbers starting at `start`.

## Install
With [npm](https://npmjs.org/) installed, run

```
$ npm install @kingjs/link.range
```

## Acknowledgments
Like [Enumerable.Range](https://msdn.microsoft.com/en-us/library/system.linq.enumerable.range(v=vs.110).aspx)

## License

MIT

![Analytics](https://analytics.kingjs.net/linq/range)