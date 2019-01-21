# @[kingjs][@kingjs]/${join('[${value}][ns${i}]', segments, '.')}
${description}
## Usage
Given a `package.json` like this:
```js
${include('./test/package.json')}
```
Running this:
```
$ cdj 
```
Produces a `dependencies.js` like this:
```js
${include('./test/dependencies.js')}
``` 
Which can then be used in like this:
```js
${include('./test/readme.js')}
``` 
## Remarks
Using `dependencies.js` ensures that production code requires only packages listed in as dependencies in `package.json`.
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install -g ${name}
```
## License
${license}

![Analytics](https://analytics.kingjs.net/${join('${value}', segments, '/')})

[@kingjs]: ${npmjs}kingjs
${join('[ns${i}]: ${npmjs}@kingjs/${value}', namespaces, '\n')}
