# @[kingjs](https://www.npmjs.com/package/kingjs)/[mutate](https://www.npmjs.com/package/@kingjs/mutate).inherit
Copy properties from set of objects which are not present on this.
## Usage
Assign default student teacher properties for Alice like this:
```js
var inherit = require('@kingjs/mutate.inherit');

var student = { name: '', ssn: '000-00-0000', credits: 0 };
var teacher = { name: '', ssn: '000-00-0000', pay: 0 };
var alice = { name: 'Alice' };

inherit.call(alice, student, teacher);
```
result:
```js
{
  name: 'Alice',
  ssn: '00-000-0000',
  credits: 0,
  pay: 0,
}
```
## API
```ts
declare function inherit(
  this: any,
  ...bases: any[]
): any
```
### Parameters
- `this`: Object onto which inherited properties are copied.
- `bases`: An array of objects whose properties will be copied to `this`. 
### Returns
Returns `this` after copying properties from `bases`.
## Remarks
Throws if inherited properties that share the same name do not also have the same value.
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/mutate.inherit
```
## License
MIT

![Analytics](https://analytics.kingjs.net/unknown)


  [xxx]: https://www.npmjs.com/package/@kingjs/mutate/inherit