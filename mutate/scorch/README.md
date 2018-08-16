# @[kingjs](https://www.npmjs.com/package/kingjs)/[mutate](https://www.npmjs.com/package/@kingjs/mutate).scorch
Deletes properties with `undefined` value. 
## Usage
```js
var scorch = require('@kingjs/mutate.scorch');

var source = { a: undefined };
var result = scorch.call(source);
'a' in result;
```
result:
```js
`false`
```
## API
```ts
declare function scorch(
  this: any
): any
```
### Parameters
- `this`: Object whose properties with `undefined` values are to be deleted.
### Returns
Returns `this` after properties with `undefined` value have been deleted.
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/mutate.scorch
```
## License
MIT

![Analytics](https://analytics.kingjs.net/mutate/scorch)
