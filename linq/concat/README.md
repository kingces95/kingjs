# @[kingjs](https://www.npmjs.com/package/kingjs)/[linq](https://www.npmjs.com/package/@kingjs/linq).concat
Generates a sequence composed of elements from one sequence followed by elements from another sequence.
## Usage
Concatenate `0`, `1` with `1`, `2` like this:
```js
var concat = require('@kingjs/linq.concat');
var sequence = require('@kingjs/sequence');
var toArray = require('@kingjs/linq.to-array');

var result = concat.call(
  sequence(0, 1),
  sequence(1, 2)
);

toArray.call(result);
```
result:
```js
[0, 1, 1, 2]
```
## API
```ts
declare function concat(
  this: Enumerable, 
  target: Enumerable
): Enumerable
```
### Interfaces
- `Enumerable`: See [@kingjs/sequence](https://www.npmjs.com/package/@kingjs/sequence).

### Parameters
- `this`: The sequence to which `target` is concatenated. 
- `target`: The sequence concatenated to `this`. 

### Return Value
A concatenation of the sequences. 

## Install
With [npm](https://npmjs.org/) installed, run

```
$ npm install @kingjs/linq.concat
```
## See Also
- Like [Enumerable.Concat](https://msdn.microsoft.com/en-us/library/bb302894(v=vs.110).aspx)

## License

MIT

![Analytics](https://analytics.kingjs.net/linq/concat)
