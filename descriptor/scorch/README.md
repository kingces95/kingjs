# @[kingjs](https://www.npmjs.com/package/kingjs)/[descriptor](https://www.npmjs.com/package/@kingjs/descriptor).scorch
Deletes properties with `undefined` value. 
## Usage
```js
var scorch = require('@kingjs/descriptor.scorch');

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
$ npm install @kingjs/descriptor.scorch
```
## License
MIT

![Analytics](https://analytics.kingjs.net/descriptor/scorch)
