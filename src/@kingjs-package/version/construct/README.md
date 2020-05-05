# @[kingjs][@kingjs]/[package-version][ns0].[construct][ns1]
Simply join `{ major, minor, patch }` into `'major.minor.patch'`.
## Usage
```js
var assert = require('assert');
var construct = require('@kingjs/package-version.construct');

assert(construct({ 
  major: 1,
  minor: '2',
  patch: 3
}) == '1.2.3');
```

## API
```ts
construct(version)
```

### Parameters
- `version`: An object `{ major, minor, patch }`
### Returns
Return `'major.minor.patch'` corresponding to `version`.


## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/package-version.construct
```

## Source
https://repository.kingjs.net/package-version/construct
## License
MIT

![Analytics](https://analytics.kingjs.net/package-version/construct)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/package-version
[ns1]: https://www.npmjs.com/package/@kingjs/package-version.construct
