# @[kingjs](https://www.npmjs.com/package/kingjs)/[descriptor](https://www.npmjs.com/package/@kingjs/descriptor).write
Writes a value to a descriptor, cloning descriptors if frozen. 
## Usage
Update a descriptor to add one to any odd numbers found as descriptor values.
```js
var write = require('@kingjs/descriptor.write');

var target = {
  value: 0,
}
  
Object.freeze(target);

write.call(target, 'value', 1);
```
result:
```js
{
  value: 1
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
Returns `this` or, if `this` is frozen, a clone of `this` with updated properties. The returned clone will not be frozen.
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/descriptor.write
```
## License
MIT

![Analytics](https://analytics.kingjs.net/descriptor/write)


  [descriptor]: https://www.npmjs.com/package/@kingjs/descriptor