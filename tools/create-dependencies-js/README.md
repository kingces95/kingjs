# @[kingjs][@kingjs]/[tools][ns0].[create-dependencies-js][ns1]
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
## Remarks
Using `dependencies.js` ensures that production code requires only packages listed in as dependencies in `package.json`.
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install -g @kingjs/tools.create-dependencies-js
```
## License
MIT

![Analytics](https://analytics.kingjs.net/{path})

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/tools
[ns1]: https://www.npmjs.com/package/@kingjs/tools.create-dependencies-js
