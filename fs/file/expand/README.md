# @[kingjs][@kingjs]/[expand-readme][ns0]
Expands `README.t.md` into `README.md`.
## Usage
Give a `package.json` like this:
```js
{
  "name": "@kingjs/ns0.ns1.example",
  "version": "1.0.1",
  "description": "Example description.",
  "main": "index.js",
  "repository": {
    "url": "https://repository.kingjs.net/ns0.ns1.example"
  },
  "license": "MIT",
  "dependencies": {}
}
```
And a `index.js` like this:
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
And a `.md/README.t.md` like this:
````
# @[kingjs][@kingjs]/${join('[${value}][ns${i}]', segments, '.')}
${description}
${canInclude('./.test/readme.js') ? expand('./USAGE.t.md') : ''}
${api ? expand('./API.t.md') : ''}
${remarks ? expand('./REMARKS.t.md') : ''}
${expand('./FOOTER.t.md')}

[@kingjs]: ${npmjs}kingjs
${join('[ns${i}]: ${npmjs}@kingjs/${value}', namespaces, '\n')}
````
And a `.md/USAGE.t.md` like this:
````
## Usage
```js
${include('./.test/readme.js').replace('..', name)}
```
````
And a `test/readme.js` like this:
```js
var assert = require('assert')

var test = require('..');

function readMe() {
  // example code here
}
readMe();
```
And a `.md/API.t.md` like this:
````
## API
```ts
${api}
```
### Parameters
${join('- `${key}`: ${value}${join("  - `${key}`: ${value}", value.callback.parameters, "\\n", "\\n")}', parameters, '\n')}
${returns ? expand('./RETURNS.t.md') : ''}
````
And a `.md/RETURNS.t.md` like this:
````
### Returns
${returns}
````
And a `.md/REMARKS.t.md` like this:
````
### Remarks
${remarks}
````
And a `.md/FOOTER.t.md` like this:
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
Running `$erm` will produce a `README.md` like this:
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
## API
```ts
expandReadme(templateRelPath)
```
### Parameters
- `templateRelPath`: The relative path to the template. Default will search `pwd` for `README.t.md`.
### Returns
Writes `README.md` in `pwd`.
## Remarks
The tool takes no command line arguments. Instead:
* The tool expects to find a `project.json` in the directory from which it's launched. 
* It then looks for a `readmeTemplate` element in the `package.json` and tries to load that value as a relative path or as a package for use as the readme template. 
  * If a package, it expects that package's `main` to be a `t.md` template file. 
* If no `readmeTemplate` is found then it searches the current directory for `README.t.md`. 
* Once the template is found, it's expanded into a `README.md` file in the current directory. 

Expansion is preformed by treating the `README.t.md` files a js template literal that has the following variables in scope:
## Variables
The following variables are in scope as the template expands:

* `npmjs` -- `https://www.npmjs.com/package/`

From `package.json`:
* `name`
* `version`
* `description`
* `license`
* `repository`
* `dependencies`

From the package name:
* `namespaces`: Array of namespaces. 
  * E.g. `@kingjs/foo-bar.baz.moo` -> [`foo-bar`, `foo-bar.baz`];
* `segments`: Array of the segments comprising the namespace.
  * E.g. `@kingjs/foo-bar.baz.moo` -> [`foo-bar`, `baz`];

From the first `JSDoc` comment found in the file pointed at by the `main` element of the `package.json` (typically `index.js`):
* `parameters[name]` -- `@param` comment for `name` and `@this` comment. Inserted in source order. 
* `returns` -- `@returns` comment
* `remarks` -- `@remarks` comment
* `api` -- Mozilla signature 
  * E.g. `foo(bar[, [baz[, moo]]])`. 
  * Optional parameters names are enclosed in square brackets. 
    * E.g. `/** @params [baz] My baz comment. */`

Functions:
* `include(relPath)` -- Include the content of the file at `relPath` using the directory of `project.json` as the base path. 
* `canInclude(relPath)` -- Test if `include(relPath)` will find a file.
* `expand(relPath)` -- Includes and expands the content of the file at the `relPath` using the directory of the readme template as the base path.
* `canExpand(relPath)` -- Test if `expand(relPath)` will find a file.
* `join(template, source[, separator[, prefix[, suffix]]])` -- Joins the expansions of `template` for each `key`/`value` pair of `source` with optional `separator`, `prefix`, and `suffix` while also introducing loop iteration variable `i`.

## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install -g @kingjs/expand-readme
$ erm
```
## Execute
With [npx](https://www.npmjs.com/package/npx) installed, run
```
$ npx @kingjs/expand-readme
```
## License
MIT

![Analytics](https://analytics.kingjs.net/expand-readme)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: ..
