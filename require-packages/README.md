# @[kingjs][@kingjs]/[require-packages][ns0]
Requires dependencies found in packages.json and returns module names mapped to exports and a tree representing module names terminating in exports.
## Usage
Given this `packages.json`:
```js
{
  "name": "@kingjs/require-packages.test",
  "version": "1.0.0",
  "dependencies": {
    "@kingjs/camel-case.join": "^1.0.0",
    "@kingjs/camel-case.split": "^1.0.0",
    "@kingjs/is": "^1.0.6",
    "lodash": "^4.17.11"
  },
  "devDependencies": {
    "@kingjs/assert-theory": "^1.0.15"
  }
}

```
Load dependencies like this:
```js
var assert = require('assert');

var {
  ['lodash']: lodash,
  ['@kingjs/is']: is,
  ['@kingjs/camel-case.split']: split,
  ['@kingjs/camel-case.join']: join,
  ['@kingjs/assert-theory']: assertTheory,
} = require('@kingjs/require-packages').call(module);

assert(lodash);         // present in "dependencies"
assert(is);             // present in "dependencies"
assert(split);          // present in "dependencies"
assert(join);           // present in "dependencies"
assert(!assertTheory);  // missing in "dependencies"


```
Or, load dependencies like this:
```js
var assert = require('assert');

var {
  lodash,
  ['@kingjs']: { is, camelCase: { split, join } },
} = require('@kingjs/require-packages').call(module);

assert(lodash == require('lodash'));
assert(is == require('@kingjs/is'));
assert(split == require('@kingjs/camel-case.split'));
assert(join == require('@kingjs/camel-case.join'));
```
## API
```ts
requirePackages(this)
```
### Parameters
- `this`: The module of the package doing the requiring.
### Returns
Module names mapped to exports and an tree representing module names terminating in exports.
### Remarks
Ensures that production code requires only packages listed in dependencies.
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/require-packages
```
## License
MIT

![Analytics](https://analytics.kingjs.net/{path})

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/require-packages
