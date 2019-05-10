# @[kingjs][@kingjs]/[path][ns0].[test][ns1]
Joins a relative path to an absolute path or, if the relative path is already absolute, return it as is.
## Usage
```js
var assert = require('assert');
var test = require('@kingjs/path.test');

var DotDirGlob = [
  '**/node_modules/**',
  /(^|[\/\\])\../
]

assert(test('/.foo', DotDirGlob))
assert(test('/foo/node_modules/bar', DotDirGlob))
assert(!test('/foo', DotDirGlob))

```

## API
```ts
test(relative[, base])
```

### Parameters
- `relative`: A relative or absolute path.
- `base`: An absolute path to be used as a base path. Defaults to the present working directory.
### Returns
Returns `relative` joined to `base` or, if `relative` is  already absolute then returns `relative` as is.


## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/path.test
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/reflect.is`](https://www.npmjs.com/package/@kingjs/reflect.is)|`latest`|
|[`minimatch`](https://www.npmjs.com/package/minimatch)|`latest`|
## Source
https://repository.kingjs.net/path/test
## License
MIT

![Analytics](https://analytics.kingjs.net/path/test)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/path
[ns1]: https://www.npmjs.com/package/@kingjs/path.test
