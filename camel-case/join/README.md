# @[kingjs][@kingjs]/[camel-case][ns0].[join][ns1]

## Usage
```js
var assert = require('assert');
var join = require('@kingjs/camel-case.join');

var together = join(['foo', 'bar']);
assert(together == 'fooBar');

var together = join(['foo', 'bar'], true);
assert(together == 'FooBar');

var together = join([]);
assert(together === null);

var together = join(['']);
assert(together === null);
```
## API
```ts
join(names[, capitalize])
```
### Parameters
- `names`: Array of names to join together into a camel case string.
- `capitalize`: True if the result should be capitalized.
### Returns
Returns a camel case string, optionally capitalized, or null.
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/camel-case.join
```
## License
MIT

![Analytics](https://analytics.kingjs.net/{path})

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/camel-case
[ns1]: https://www.npmjs.com/package/@kingjs/camel-case.join
