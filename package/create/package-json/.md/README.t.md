# @[kingjs][@kingjs]/${join('[${value}][ns${i}]', segments, '.')}
${description}
## Usage
Given a `package.json` like this:
```js
${include('./.test/package.t.json')}
```
And a `index.js` like this:
```js
${include('./.test/index.js')}
```
Running this:
```
$ cpk
```
Produces a `package.json` like this:
```js
${include('./.test/package.json')}
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
$ npm install -g ${name}
$ cpk
```
## Execute
With [npx](https://www.npmjs.com/package/npx) installed, run
```
$ npx ${name}
```
## License
${license}

![Analytics](https://analytics.kingjs.net/${join('${value}', segments, '/')})

[@kingjs]: ${npmjs}kingjs
${join('[ns${i}]: ${npmjs}@kingjs/${value}', namespaces, '\n')}
