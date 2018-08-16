# @[kingjs](https://www.npmjs.com/package/kingjs)/[mutate](https://www.npmjs.com/package/@kingjs/mutate).copy
Copies own and inherited enumerable property values optionally skipping those already defined.
## Usage
Copy properties from `source` to `target` like this:
```js
var copy = require('@kingjs/mutate.copy');

var target = { 
  a: 0,
  b: 1, 
};

var source = { 
  b: 2,
  c: 3
};

copy.call(target, source); 
```
result:
```js
{
  a: 0,
  b: 2,
  c: 3
}
```
## API
```ts
declare function copy(
  this, 
  source?, 
  skipIfDefined?: boolean | (name) => boolean,
): any
```
### Parameters
- `this`: An object to which properties are copied.
- `source`: An object whose properties are copied to `this`.
- `skipIfDefined`: Prevent overwriting if:
  - `true`.
  - A function that returns `true` given:
    - `name`: The name of the existing property.
### Returns
Returns `this` after copying properties and values from `source`.
## Remarks
Inherited and own properties are copied. 

Non-enumerable properties are _not_ copied.

if `source` is `null` or `undefined`, then `this` is returned unmodified.
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/mutate.copy
```
## License
MIT

![Analytics](https://analytics.kingjs.net/mutate/copy)
