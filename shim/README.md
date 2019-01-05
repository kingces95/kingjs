# @[kingjs](https://www.npmjs.com/package/kingjs)/shim
## Usage
```js
require('@kingjs/shim');
```
## Generators implement IIterable
Demonstrate the before and after behavior of this shim like this:
```js
var assert = require('assert');

function* generator() { yield 0; }

// oddly, a generator is not it's own Symbol.iterator
assert(!generator[Symbol.iterator]);

require('@kingjs/shim');

// Shim generators so they implement the Symbol.iterator protocol
var iterator = generator[Symbol.iterator]();
assert(iterator);

var next;
assert(next = iterator.next(), !next.done);
assert(next.value == 0);
assert(next = iterator.next(), next.done);
```
## API
```ts
declare function shim(
): any
```
### Parameters
### Returns
## Remarks
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/shim
```
## License
MIT

![Analytics](https://analytics.kingjs.net/shim)