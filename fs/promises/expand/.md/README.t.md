# @[kingjs][@kingjs]/${join('[${value}][ns${i}]', segments, '.')}
${description}
## Usage
Give a `package.json` like this:
```js
${include('.test/package.json')}
```
And a `index.js` like this:
```js
${include('.test/index.js')}
```
And a `.md/README.t.md` like this:
````
${include('.test/.md/README.t.md')}
````
And a `.md/USAGE.t.md` like this:
````
${include('.test/.md/USAGE.t.md')}
````
And a `test/readme.js` like this:
```js
${include('.test/.test/readme.js')}
```
And a `.md/API.t.md` like this:
````
${include('.test/.md/API.t.md')}
````
And a `.md/RETURNS.t.md` like this:
````
${include('.test/.md/RETURNS.t.md')}
````
And a `.md/REMARKS.t.md` like this:
````
${include('.test/.md/REMARKS.t.md')}
````
And a `.md/FOOTER.t.md` like this:
````
${include('.test/.md/FOOTER.t.md')}
````
Running `$erm` will produce a `README.md` like this:
````

${include('.test/README.md')}
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
$ npm install -g ${name}
$ erm
```
## Execute
With [npx](https://www.npmjs.com/package/npx) installed, run
```
$ npx @kingjs/expand-readme
```
## License
${license}

![Analytics](https://analytics.kingjs.net/${join('${value}', segments, '/')})

[@kingjs]: ${npmjs}kingjs
${join('[ns${i}]: ${npmjs}@kingjs/${value}', namespaces, '\n')}
