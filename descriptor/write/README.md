# @[kingjs](https://www.npmjs.com/package/kingjs)/[descriptor](https://www.npmjs.com/package/@kingjs/descriptor).write
Define a function that copies a descriptor on the first write if copyOnWrite is true or the descriptor is frozen. 
## Usage
Update a descriptor to add one to any odd numbers found as descriptor values.
```js
var write = require('@kingjs/descriptor.write');

var copyOnWriteArg = 0;
var makeEven = write.define(
  function(target) {
    for (var name in this) {
      var value = this[name];
      if (value % 2 == 0)
        continue;
      
      target = write.call(
        this, target, name, value + 1
      );
    }
  }, copyOnWriteArg
);

var numbers = {
  x: 0,
  y: 1,
  z: 2
}

Object.freeze(numbers);

var copyOnWrite = true;
var evenNumbers = makeEven.call(numbers, copyOnWrite);

return {
  modified: evenNumbers == numbers,
  frozen: Object.isFrozen(evenNumbers),
  value: evenNumbers
}
```
result:
```js
{
  modified: true,
  frozen: true,
  value: {
    x: 0,
    y: 2,
    z: 2
  }
}
```
## API
```ts
declare function write(
  this: Descriptor,
  target: Descriptor,
  name: string,
  value: any
): Descriptor
```
### Interfaces
- `Descriptor`: see [@kingjs/descriptor][descriptor]
### Parameters
- `this`: The descriptor whose property will be updated.
- `target`: The descriptor where the updated value is written. If null, then replaced with clone of `this` on first write.
- `name`: The property to write.
- `value`: The updated value.
### Returns
Returns `target` which should be used as `target` to the next `write`. 
## Remarks
The function which uses `write` must have prolog and epilog stubs installed using `write.define`. The prolog expects the `this` parameter to be the descriptor and to be passed the position of `copyOnWrite`. The prolog will insert `target` as the first argument before invoking the function. The epilog expects the function to return `target`. The function will return `this` or a clone of `this` with updated properties. If `this` is frozen then its returned clone will also be frozen.
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/descriptor.write
```
## License
MIT

![Analytics](https://analytics.kingjs.net/descriptor/write)


  [descriptor]: https://www.npmjs.com/package/@kingjs/descriptor