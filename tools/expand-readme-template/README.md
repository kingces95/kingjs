# @[kingjs][@kingjs]/[tools][ns0].[expand-readme-template][ns1]
Generates `README.md` from a `README.t.md` given `package.config`.
## Usage
Give a `package.json` like this:
```js
{
  "name": "@kingjs/ns0.ns1.example",
  "version": "1.0.0",
  "description": "Example description.",
  "main": "index.js",
  "repository": {
    "url": "https://repository.kingjs.net/ns0.ns1.example"
  },
  "license": "MIT"
}

```
And a `index.js` like this:
```js
/**
 * @this any This comment
 * @param foo Foo comment
 * @param [bar] Bar comment
 * @param [baz] Baz comment
 * @returns Returns comment
 */
function example(foo, bar, baz) { }

```
And a `readme.js` like this:
```js
var assert = require('assert')

var test = require('..');

function readMe() {
  // example code here
}
readMe();
```
And a `FOOTER.t.md` like this:
````
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install ${name}
```
## Source
${repository}
## License
${license}

![Analytics](https://analytics.kingjs.net/${join('${value}', segments, '/')})
````
And a `README.t.md` like this:
````
# @[kingjs][@kingjs]/${join('[${value}][ns${i}]', segments, '.')}
${description}
## Usage
```js
${include('./readme.js').replace('..', name)}
```
## API
```ts
${api}
```
### Parameters
${join('- `${key}`: ${value}', parameters, '\n', signature)}
## Remarks
Run in directory containing `package.json`.
${expand('./FOOTER.t.md')}

[@kingjs]: ${npmjs}kingjs
${join('[ns${i}]: ${npmjs}@kingjs/${value}', namespaces, '\n')}

````
Running `ert` will produce a `README.md` like this:
````

# @[kingjs][@kingjs]/[ns0][ns0].[ns1][ns1].[example][ns2]
Example description.
## Usage
```js
var assert = require('assert')

var test = require('@kingjs/ns0.ns1.example');

function readMe() {
  // example code here
}
readMe();
```
## API
```ts
example(this, foo[, bar[, baz]])
```
### Parameters
- `this`: This comment
- `foo`: Foo comment
- `bar`: Bar comment
- `baz`: Baz comment
## Remarks
Run in directory containing `package.json`.
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/ns0.ns1.example
```
## Source
https://repository.kingjs.net/ns0.ns1.example
## License
MIT

![Analytics](https://analytics.kingjs.net/ns0/ns1/example)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/ns0
[ns1]: https://www.npmjs.com/package/@kingjs/ns0.ns1
[ns2]: https://www.npmjs.com/package/@kingjs/ns0.ns1.example

````
## Variables
The following variables are available:

* `npmjs` -- `https://www.npmjs.com/package/`

From `package.json`:
* `name`
* `version`
* `description`
* `license`
* `repository`

From the package name:
* `namespaces`: Array of namespaces. 
  * E.g. `@kingjs/foo-bar.baz.moo` -> [`foo-bar`, `foo-bar.baz`];
* `segments`: Array of the segments comprising the namespace.
  * E.g. `@kingjs/foo-bar.baz.moo` -> [`foo-bar`, `baz`];

From the first `JSDoc` comment found in `package.json` `main`:
* `parameters[name]` -- `@param` comment for `name`
* `parameters.this` -- `@this` comment
* `returns` -- `@returns` comment
* `summary` -- `@summary` comment
* `api` -- Mozilla signature 
  * E.g. `foo(bar[, [baz[, moo]]])`. 
  * Optional parameters names are enclosed in square brackets. 
    * E.g. `@params [baz] My baz comment.`

Functions:
* `include(relPath)` -- Include the content of the file at `relPath`
* `expand(relPath)` -- Includes and expands the content of the file at the `relPath`.
* `join(template, source,[ separator[, keys]])` -- Joins the expansions of `template` for each `key`/`value` pair of `source` with `separator` ordered by `keys`. Also introduces loop iteration variable `i`.

## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install -g @kingjs/tools.expand-readme-template
$ ert
```
## License
MIT

![Analytics](https://analytics.kingjs.net/tools/expand-readme-template)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/tools
[ns1]: https://www.npmjs.com/package/@kingjs/tools.expand-readme-template
