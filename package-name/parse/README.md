# @[kingjs][@kingjs]/[package-name][ns0].[parse][ns1]

## Usage
```js
var assert = require('assert');
var parse = require('@kingjs/package-name.parse');

var apart = parse('@kingjs/foo-bar.baz');
assert(apart.scope == 'kingjs');
assert(apart.fullName == 'foo-bar.baz');

assert(apart.names.length == 2);
assert(apart.names[0] == 'foo-bar');
assert(apart.names[1] == 'baz');

assert(apart.parts.length == 2);
assert(apart.parts[0].length == 2);
assert(apart.parts[1].length == 1);
assert(apart.parts[0][0] == 'foo');
assert(apart.parts[0][1] == 'bar');
assert(apart.parts[1][0] == 'baz');


var apart = parse('foo-bar.baz');
assert(!apart.scope);
assert(apart.fullName == 'foo-bar.baz');

var apart = parse('Bad-Name');
assert(apart === undefined);
```
## API
```ts
parse(name)
```
### Parameters
- `name`: The package name to parse.
### Returns
Returns an AST of literals comprising the package name.
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/package-name.parse
```
## License
MIT

![Analytics](https://analytics.kingjs.net/{path})

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/package-name
[ns1]: https://www.npmjs.com/package/@kingjs/package-name.parse
