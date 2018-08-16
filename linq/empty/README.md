# @[kingjs](https://www.npmjs.com/package/kingjs)/[linq](https://www.npmjs.com/package/@kingjs/linq).empty
Returns an empty sequence.
## Usage
Generate an empty sequence like this:
```js
var empty = require('@kingjs/linq.empty');
var toArray = require('@kingjs/linq.to-array');

toArray.call(empty());
```
result:
```js
[]
```
## API
```ts
declare function(): Enumerable;
```
### Interfaces
- `Enumerable`: See [@kingjs/sequence](https://www.npmjs.com/package/@kingjs/sequence).
### Result
An empty sequence.
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/link.empty
```
## Acknowledgments
Like [`Enumerable.Empty`](https://msdn.microsoft.com/en-us/library/bb341042(v=vs.110).aspx).
## License
MIT

![Analytics](https://analytics.kingjs.net/linq/empty)