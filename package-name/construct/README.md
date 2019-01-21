# @[kingjs][@kingjs]/[package-name][ns0].[construct][ns1]

## Usage
```js
var assert = require('assert');
var construct = require('@kingjs/package-name.construct');

var together = construct('kingJs', [['Foo', 'Bar'], ['BaZ']]);
assert(together == '@kingjs/foo-bar.baz');

```
## API
```ts
construct(scope, parts)
```
### Parameters
- `scope`: The package scope.
- `parts`: An array of arrays of strings joined with dash then period.
### Returns
Returns the package name.
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/package-name.construct
```
## License
MIT

![Analytics](https://analytics.kingjs.net/{path})

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/package-name
[ns1]: https://www.npmjs.com/package/@kingjs/package-name.construct
