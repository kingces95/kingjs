# @[kingjs][@kingjs]/[foo][@kingjs/foo].[bar][@kingjs/foo.bar].baz
Generates README content from a template in package.config.
## Usage
```js
'use strict';
var makeReadme = require('@kingjs/make-readme');
var assert = require('assert')

```
## API
```ts
example(foo[, bar[, baz]])
```
### Parameters
- `foo`: Foo comment
- `bar`: Bar comment
- `baz`: Baz comment
## Remarks
Run in directory containing `package.json`.
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install -g @kingjs/make-readme
$ make-readme
```
## License
MIT

![Analytics](https://analytics.kingjs.net/{path})

[@kingjs]: https://www.npmjs.com/package/kingjs
[@kingjs/foo]: https://www.npmjs.com/package/@kingjs/foo
[@kingjs/foo.bar]: https://www.npmjs.com/package/@kingjs/foo.bar

