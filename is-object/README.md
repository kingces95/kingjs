# @[kingjs](https://www.npmjs.com/package/kingjs)/is-object
Returns true if the `typeof` a value is `'object'` and is not `null`.
## Usage
Test if `undefined`, `10`, `null`, `'Hi!'`, `function() { }`, `[]`, `{ }` are objects like this: 
```js
var isObject = require('@kingjs/is-object');

{
  undef: isObject(),
  nll: isObject(null),
  number: isObject(10),
  string: isObject('Hi!'),
  func: isObject(function() { }),
  array: isObject([ ]), 
  literal: isObject({ }), 
}
```
result:
```js
{
  undef: false,
  nll: false,
  number: false,
  string: false,
  func: false,
  array: true, 
  literal: true, 
}
```
## API
```ts
declare function isObject(
  value: any
): boolean
```
### Parameters
- `value`: The value to test.
### Returns
Returns true if the type of the value is object and the value is not null.
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/is-object
```
## License
MIT

![Analytics](https://analytics.kingjs.net/is-object)