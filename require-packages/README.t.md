# @[kingjs][@kingjs]/${join('[${value}][ns${i}]', segments, '.')}
${description}
## Usage
Given this `packages.json`:
```js
${include('test/package.json').replace('..', name)}
```
Load dependencies like this:
```js
${include('test/readme.0.js').replace('..', name)}
```
Or, load dependencies like this:
```js
${include('test/readme.1.js').replace('..', name)}
```
## API
```ts
${api}
```
### Parameters
${join('- `${key}`: ${value}', parameters, '\n', signature)}
### Returns
${returns}
### Remarks
Ensures that production code requires only packages listed in dependencies.
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install ${name}
```
## License
${license}

![Analytics](https://analytics.kingjs.net/{path})

[@kingjs]: ${npmjs}kingjs
${join('[ns${i}]: ${npmjs}@kingjs/${value}', namespaces, '\n')}
