# @[kingjs][@kingjs]/${join('[${value}][ns${i}]', segments, '.')}
${description}
## Usage
Give a `package.json` like this:
```js
${include('test/package.json')}
```
And a `index.js` like this:
```js
${include('test/index.js')}
```
And a `readme.js` like this:
```js
${include('test/readme.js')}
```
And a `FOOTER.t.md` like this:
````
${include('test/FOOTER.t.md')}
````
And a `README.t.md` like this:
````
${include('test/README.t.md')}
````
Running `ert` will produce a `README.md` like this:
````

${include('test/README.md')}
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
$ npm install -g ${name}
$ ert
```
## License
${license}

![Analytics](https://analytics.kingjs.net/${join('${value}', segments, '/')})

[@kingjs]: ${npmjs}kingjs
${join('[ns${i}]: ${npmjs}@kingjs/${value}', namespaces, '\n')}
