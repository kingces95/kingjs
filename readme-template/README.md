# @[kingjs][@kingjs]/[readme-template][ns0]
The master readme template for the `kingjs` scope.
## Usage
Given a `package.json` like this:
```
{
  "name": "@kingjs/readme-template.test",
  "version": "1.0.0",
  "description": "Test of the master readme template for the `kingjs` scope.",
  "main": "index.js",
  "files": [
    "*.js"
  ],
  "repository": {
    "type": "git",
    "url": "https://repository.kingjs.net/readme-template"
  },
  "license": "MIT",
  "dependencies": { }
}

```
And given a `index.js` like this:
```js
'use strict';
var assert = require('assert');

var {
} = require('@kingjs/require-packages').call(module);

/**
 * @this any This comment
 * @param foo Foo comment
 * @returns Returns comment
 */
function xxx(foo) {
}

module.exports = xxx;
```
Then...
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/readme-template
```
## License
MIT

![Analytics](https://analytics.kingjs.net/readme-template)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/readme-template
