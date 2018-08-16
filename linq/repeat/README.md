# @[kingjs](https://www.npmjs.com/package/kingjs)/[linq](https://www.npmjs.com/package/@kingjs/linq).range
Generate a sequence of a repeated value.
## Usage
Repeat `0` 3 times like this:
```js
var repeat = require('@kingjs/linq.repeat');
var toArray = require('@kingjs/linq.to-array');

toArray.call(repeat(0, 3));
```
result:
```js
[0, 0, 0]
```

## API
```ts
function repeat(
  value: any, 
  count: number
): Enumerable
```
### Interfaces
- `Enumerable`: See [@kingjs/sequence](https://www.npmjs.com/package/@kingjs/sequence).

### Parameters
- `value`: The value to repeat.
- `count`: The number of repetitions.

### Return Value
A sequence of `count` repetitions of `value`.

## Install
With [npm](https://npmjs.org/) installed, run

```
$ npm install @kingjs/link.repeat
```

## Acknowledgments
Like [Enumerable.Repeat](https://msdn.microsoft.com/en-us/library/bb348899(v=vs.110).aspx)

## License

MIT

![Analytics](https://analytics.kingjs.net/linq/repeat)