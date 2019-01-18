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
  "dependencies": {
    "@kingjs/readme-template": "^1.0.5"
  },
  "devDependencies": {},
  "readmeTemplate": "@kingjs/readme-template"
}

```
And given a `index.js` like this:
```js
/**
 * @this any This comment
 * @param foo Foo comment
 * @param [bar] Bar comment
 * @param [baz] Baz comment
 * @returns The return comment.
 */
function example(foo, bar, baz) { }

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
