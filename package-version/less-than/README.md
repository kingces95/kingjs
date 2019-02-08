# @[kingjs][@kingjs]/[package-version][ns0].[less-than][ns1]
Compare if one version is less than another.
## Usage
```js
var assert = require('assert');
var lessThan = require('@kingjs/package-version.less-than');

assert(lessThan('1.2.3', '2.0.0'));
assert(lessThan('1.2.3', '1.3.0'));
assert(lessThan('1.2.3', '1.2.4'));

assert(!lessThan('1.2.3', '1.2.3'));

var major = 1;
var minor = 2;
var patch = 3;
assert(!lessThan({ major, minor, patch }, '1.2.3'));
```

## API
```ts
lessThan(lhs, rhs)
```

### Parameters
- `lhs`: A version string or object of the form `{ major, minor, patch }`.
- `rhs`: A version string or object of the form `{ major, minor, patch }`.
### Returns
Returns `true` if `lhs` is less than `rhs`.


## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/package-version.less-than
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/is`](https://www.npmjs.com/package/@kingjs/is)|`^1.0.9`|
|[`@kingjs/package-version.parse`](https://www.npmjs.com/package/@kingjs/package-version.parse)|`^1.0.0`|
## Source
https://repository.kingjs.net/package-version/less-than
## License
MIT

![Analytics](https://analytics.kingjs.net/package-version/less-than)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/package-version
[ns1]: https://www.npmjs.com/package/@kingjs/package-version.less-than
