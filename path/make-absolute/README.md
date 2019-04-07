# @[kingjs][@kingjs]/[path][ns0].[make-absolute][ns1]
Joins a relative path to an absolute path or, if the relative path is already absolute, return it as is.
## Usage
```js
var assert = require('assert');
var path = require('path');
var makeAbsolute = require('@kingjs/path.make-absolute');

var DirName = 'foo';

var expected = path.join(process.cwd(), DirName);
var actual = makeAbsolute(DirName);
assert(expected == actual)
```

## API
```ts
makeAbsolute(relative[, base])
```

### Parameters
- `relative`: A relative or absolute path.
- `base`: An absolute path to be used as a base path. Defaults to the present working directory.
### Returns
Returns `relative` joined to `base` or, if `relative` is  already absolute then returns `relative` as is.


## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/path.make-absolute
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/reflect.export-extension`](https://www.npmjs.com/package/@kingjs/reflect.export-extension)|`latest`|
## Source
https://repository.kingjs.net/path/make-absolute
## License
MIT

![Analytics](https://analytics.kingjs.net/path/make-absolute)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/path
[ns1]: https://www.npmjs.com/package/@kingjs/path.make-absolute
