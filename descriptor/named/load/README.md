# @[kingjs](https://www.npmjs.com/package/kingjs)/[descriptor](https://www.npmjs.com/package/@kingjs/descriptor).[named](https://www.npmjs.com/package/@kingjs/descriptor.named).load
For each descriptor, replaces properties containing descriptor names the actual descriptor then maps the descriptor.
## Usage
```js
var load = require('@kingjs/descriptor.named.load');
var write = require('@kingjs/descriptor.write');

var globalId = 0;

var descriptors = load.call({ 
  baz: { baseFunc: 'bar' },
  foo: { baseFunc: null },
  bar: { baseFunc: 'foo' },
}, o => {
  var id = globalId++;
  o = write.call(o, 'id', id);
  o = write.call(o, 'func', function() {
    var result = this.id;
    if (this.baseFunc)
      result += ' -> ' + this.baseFunc();
    return result;
  });
  return o;
}, {
  '*': { baseFunc: o => o.func }
});

{
  foo: descriptors.foo.func(),
  bar: descriptors.bar.func(),
  baz: descriptors.baz.func(),
}
```
result:
```js
{
  foo: '0',
  bar: '1 -> 0',
  baz: '2 -> 1 -> 0'
}
```
## API
```ts
declare function load(
  this: DescriptorNamed,
  callback?: (this, value: Descriptor) => Descriptor,
  refs?: DescriptorNested,
  thisArg?: any
): DescriptorNamed
```
### Interfaces
- `Descriptor`: see [@kingjs/descriptor][descriptor]
- `DescriptorNamed`: see [@kingjs/descriptor.named][descriptor-named]
- `DescriptorNested`: see [@kingjs/descriptor.nested][descriptor-nested]
### Parameters
- `this`: The named of descriptors with properties to load.
- `callback`: Maps a descriptor after all `refs` have been resolved.
- `refs`: Paths to the properties to load.
  - `descriptor`: Optional selector of a property value in load descriptor.
- `thisArg`: Passed as `this` argument to `callback`.
### Returns
Returns a `DescriptorNamed` whose members have had their references to other members load.
## Remarks
Graph of references must form a poset. 
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/descriptor.named.load
```
## License
MIT

![Analytics](https://analytics.kingjs.net/descriptor/named/load)

  [descriptor]: https://www.npmjs.com/package/@kingjs/descriptor
  [descriptor-named]: https://www.npmjs.com/package/@kingjs/descriptor.named
  [descriptor-nested]: https://www.npmjs.com/package/@kingjs/descriptor.nested