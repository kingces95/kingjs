# @[kingjs][@kingjs]/${join('[${value}][ns${i}]', segments, '.')}
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
### Returns
${returns}
### Remarks
If the callback returns a function it will be assigned to the descriptor `value` property.
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install ${name}
```
## License
${license}

![Analytics](https://analytics.kingjs.net/${join('${value}', segments, '/')})

[@kingjs]: ${npmjs}kingjs
${join('[ns${i}]: ${npmjs}@kingjs/${value}', namespaces, '\n')}
