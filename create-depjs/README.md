# @[kingjs][@kingjs]/[create-depjs][ns0]
Generates dependencies.js which exports the dependencies in package.json.
## Usage
Given a `package.json` like this:
```js
{
  "name": "@kingjs/tools.create-dependencies-js",
  "version": "1.0.0",
  "dependencies": {
    "@kingjs/camel-case.join": "^1.0.0",
    "@kingjs/package-name.parse": "^1.0.1"
  }
}

```
Running this:
```
$ cdj 
```
Produces a `dependencies.js` like this:
```js
exports['@kingjs'] = {
  camelCase: {
    join: require('@kingjs/camel-case.join'),
  },
  packageName: {
    parse: require('@kingjs/package-name.parse'),
  },
}
``` 
Which can then be used in like this:
```js
var assert = require('assert');

var { 
  ['@kingjs']: {
    packageName: { parse },
    camelCase: { join }
  }
} = require('./dependencies');

assert(parse);
assert(join);
``` 
## Remarks
Using `dependencies.js` ensures that production code requires only packages listed in as dependencies in `package.json`.
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install -g @kingjs/create-depjs
```
## License
MIT

![Analytics](https://analytics.kingjs.net/create-depjs)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/create-depjs
