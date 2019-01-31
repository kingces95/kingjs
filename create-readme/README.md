# @[kingjs][@kingjs]/[create-readme][ns0]
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
    "@kingjs/is": "^1.0.9"
  }
}

```
And given a `index.js` like this:
```js
/**
 * @this any This comment
 * 
 * @param callback Callback comment.
 * @param foo Foo comment.
 * @param [bar] Bar comment.
 * @param [baz] Baz comment.
 * 
 * @returns The return comment.
 * Return comment that spans a line.
 * 
 * @remarks Remarks comment
 * that spans lines.
 * @remarks - Remarks comment on new line.
 * 
 * @callback
 * @param pop Default callback.
 * 
 * @callback foo
 * @param moo Moo comment.
 * @param [boo] Boo comment
 */
function example(callback, foo, bar, baz) { }

```
And given a `.test/readme.js` like this:
```js
var assert = require('assert');
var myPackage = require('..');

// example goes here!
```
Then running `$ erm` will produce a `README.md` like this:
````
# @[kingjs][@kingjs]/[readme-template][ns0].[test][ns1]
Test of the master readme template for the `kingjs` scope.

## API
```ts
example(this, callback(pop), foo(moo[, boo])[, bar[, baz]])
```

### Parameters
- `this`: This comment
- `callback`: Callback comment.
  - `pop`: Default callback.
- `foo`: Foo comment.
  - `moo`: Moo comment.
  - `boo`: Boo comment
- `bar`: Bar comment.
- `baz`: Baz comment.
### Returns
The return comment. Return comment that spans a line.
### Remarks
Remarks comment that spans lines.
- Remarks comment on new line.

## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/readme-template.test
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/is`](https://www.npmjs.com/package/@kingjs/is)|`^1.0.9`|
## Source
https://repository.kingjs.net/readme-template
## License
MIT

![Analytics](https://analytics.kingjs.net/readme-template/test)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/readme-template
[ns1]: https://www.npmjs.com/package/@kingjs/readme-template.test

````
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm init @kingjs/readme
```
or
```
$ npm install -g @kingjs/create-readme
$ crm
```
## Execute
With [npx](https://www.npmjs.com/package/npx) installed, run
```
$ npx @kingjs/create-readme
```
## License
MIT

![Analytics](https://analytics.kingjs.net/create-readme)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/create-readme
