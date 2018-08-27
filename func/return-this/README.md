# @[kingjs](https://www.npmjs.com/package/kingjs)/[func](https://www.npmjs.com/package/func).return-this
A function that returns `this`.
## Usage
Return `this` like this:
```js
var returnThis = require('@kingjs/func.return-this');

returnThis.call('Hello World!');
```
result:
```js
'Hello World!'
```
## API
```ts
declare function returnThis(
  this: any
): any
```
### Parameters
- `this`: Any value.
### Returns
Returns `this`.
## Remarks
If `this` is a primitive value, then `returnThis` will return a boxed version of the primitive value.
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/func.return-this
```
## License
MIT

![Analytics](https://analytics.kingjs.net/func/return-this)