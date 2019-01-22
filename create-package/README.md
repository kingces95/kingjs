# @[kingjs][@kingjs]/[create-package][ns0]
Creates or updates fields of `package.json` that can be inferred from the surrounding environment.
## Usage
Given a `package.json` at a relative path `create-package/example` like this:
```js
{
  "name": "",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "files": [
    "*.js"
  ],
  "repository": {
    "type": "git",
    "url": ""
  },
  "license": "MIT",
  "dependencies": {
  }
}

```
And a `index.js` like this:
```js
/**
 * @description A description of the package.
 */
function example() { }
```
Running this:
```
$ cpk
```
Produces a `package.json` like this:
```js
{
  "name": "@kingjs/create-package.example",
  "version": "1.0.0",
  "description": "A description of the package.",
  "main": "index.js",
  "files": [
    "*.js"
  ],
  "repository": {
    "type": "git",
    "url": "https://repository.kingjs.net/create-package/example"
  },
  "license": "MIT",
  "dependencies": {}
}
``` 
## API
```ts
createPackage()
```

### Remarks
The following are harvested from environment:
- `description`: The first JsDoc `description` found in the `main` js file.
- `name`: A join with period of the relative path of this package in the repository.
- `repository.url`: `https://repository.kingjs.net/` plus a join with forward slash of the relative paths in the repository.
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm init @kingjs/package
```
or
```
$ npm install -g @kingjs/create-package
$ cpk
```
## Execute
With [npx](https://www.npmjs.com/package/npx) installed, run
```
$ npx @kingjs/create-package
```
## License
MIT

![Analytics](https://analytics.kingjs.net/create-package)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/create-package
