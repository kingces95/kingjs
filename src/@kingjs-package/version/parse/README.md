# @[kingjs][@kingjs]/[package-version][ns0].[parse][ns1]
Parse `'major.minor.version'` into `{ major, minor, version }`.
## Usage
```js
var assert = require('assert');
var parse = require('@kingjs/package-version.parse');

assert.deepEqual({
  major: 10,
  minor: 20,
  patch: 30
}, parse('10.20.30'));
```

## API
```ts
parse(version)
```

### Parameters
- `version`: A version string typically taken from `package.json`.
### Returns
Returns `{ major, minor, version }` where the fields are numbers parsed from `version`.


## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/package-version.parse
```

## Source
https://repository.kingjs.net/package-version/parse
## License
MIT

![Analytics](https://analytics.kingjs.net/package-version/parse)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/package-version
[ns1]: https://www.npmjs.com/package/@kingjs/package-version.parse
