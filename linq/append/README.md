# @[kingjs](https://www.npmjs.com/package/kingjs)/[linq](https://www.npmjs.com/package/@kingjs/linq).append
Generates an sequence identical to another sequence but with a value added to the end.
## Usage
Append `3` to the sequence `0`, `1`, `2` like this:

```js
var append = require('@kingjs/linq.append');
var sequence = require('@kingjs/sequence');
var toArray = require('@kingjs/linq.to-array');

var enumerable = sequence(0, 1, 2);

var result = append.call(enumerable, 3);

toArray.call(result);
```
result:
```js
[0, 1, 2, 3]
```
## API
```ts
declare function append(
  this: Enumerable,
  value
): Enumerable
```
### Interfaces
- `Enumerable`: See [@kingjs/sequence](https://www.npmjs.com/package/@kingjs/sequence).

### Parameters
- `this`: A sequence of values. 
- `value`: The value to append.

### Return Value
Returns a sequence with `value` appended.

## Install
With [npm](https://npmjs.org/) installed, run

```
$ npm install @kingjs/linq.append
```

## Acknowledgments
Like [Enumerable.Append](https://msdn.microsoft.com/en-us/library/mt823360(v=vs.110).aspx)

## License

MIT

![Analytics](https://analytics.kingjs.net/linq/append)
