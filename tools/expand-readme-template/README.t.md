# @[kingjs][@kingjs]/${join('[${value}][ns${i}]', segments)}
${description}
## Usage
```js
${include('test/readme.js').replace('..', name)}
```
## API
```ts
${api}
```
### Parameters
${join('- `${key}`: ${value}', parameters, '\n', signature)}
## Remarks
Run in directory containing `package.json`.
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install -g ${name}
$ make-readme
```
## License
${license}

![Analytics](https://analytics.kingjs.net/{path})

[@kingjs]: ${npmjs}kingjs
${join('[ns${i}]: ${npmjs}@kingjs/${value}', namespaces, '\n')}
