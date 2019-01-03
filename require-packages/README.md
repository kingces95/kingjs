# @[kingjs](https://www.npmjs.com/package/kingjs)/require-packages
Requires dependencies found in `packages.json` and returns a dictionary of package names to module exports.
## Usage
Ensure an example package depends strictly on packages listed the `dependencies`, as opposed to `devDependencies`, like this:
```js
// package.json
{
  "name": "@kingjs/example",
  "version": "1.0.0",
  "dependencies": {
    "@kingjs/is": "^1.0.6"
  },
  "devDependencies": {
    "@kingjs/assert-theory": "^1.0.15"
  }
}

```
```js
// index.js
module.requirePackages = require('@kingjs/require-packages');

var assert = require('assert')
var {
  ['@kingjs/is']: is,
  ['@kingjs/assert-theory']: assertTheory,
} = module.requirePackages();

assert(is); // ok!
assert(!assertTheory); // missing!
```
## API
```ts
declare function requirePackages(
  this: Module,
  path?: string
): any
```
### Parameters
- `this`: The `Module` used to require packages found in `path`.
- `path`: The path the JSON file to load. Default is `'./packages.json'`.
### Returns
Returns an object mapping package names to module exports.
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/require-packages
```
## License
MIT

![Analytics](https://analytics.kingjs.net/require-packages)