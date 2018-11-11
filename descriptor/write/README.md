# @[kingjs](https://www.npmjs.com/package/kingjs)/[descriptor](https://www.npmjs.com/package/@kingjs/descriptor).write
Writes a value to a descriptor. 
## Usage
Set a few properties on a descriptor like this.
```js
var write = require('@kingjs/descriptor.write');

var target = { foo: 0 };
write.call(target, 'bar', 0);
```
result:
```js
{
  foo: 0,
  bar: 0,
}
```
## API
```ts
declare function write(
  descriptor: Descriptor,
  name: string,
  value: any
): Descriptor
```
### Interfaces
- `Descriptor`: see [@kingjs/descriptor][descriptor]
### Parameters
- `this`: The descriptor whose property will be updated.
- `name`: The property to write.
- `value`: The updated value.
### Returns
Returns a clone of `this` with updated properties. 
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/descriptor.write
```
## License
MIT

![Analytics](https://analytics.kingjs.net/descriptor/write)

  [descriptor]: https://www.npmjs.com/package/@kingjs/descriptor
  [freeze]: https://www.npmjs.com/package/@kingjs/descriptor/freeze
  [is-frozen]: https://www.npmjs.com/package/@kingjs/descriptor/is-frozen