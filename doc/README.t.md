# @[kingjs][@kingjs]/[foo][@kingjs/foo].[bar][@kingjs/foo.bar].baz
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
${lines('- `${key}`: ${value}', parameters, signature)}
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
${lines('[@kingjs/${value}]: ${npmjs}@kingjs/${value}', paths)}
