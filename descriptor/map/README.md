# @[kingjs](https://www.npmjs.com/package/kingjs)/[descriptor](https://www.npmjs.com/package/@kingjs/descriptor).map
Maps descriptor property values.
## Usage
Map a properties using a variety of declarations like this:
```js
var map = require('@kingjs/descriptor.map');
var write = require('@kingjs/descriptor.write');

var result = map.call({
  inflateMe: function $(arg, key, path) { return arg; },
  squareMe: 3,
  scorchMe: { foo: undefined },
  writeMe: 'Hello World'  
}, {
  inflate: { inflateMe: null },
  thunks: { squareMe: (value, arg, key) => value * value },
  scorch: { },
  callback: (descriptor, arg) =>
    write.call(descriptor, 'writeMe', descriptor.writeMe + '!')
}, 'myArg');
```
result:
```js
{
  inflateMe: 'myArg',
  squareMe: 9,
  scorchMe: { },
  writeMe: 'Hello World!'
}
```
## API
```ts
declare function map(
  this: Descriptor,
  action: (value, arg, key) => Descriptor | {
    inflate?: DescriptorTree | (arg, key, path) => Descriptor,
    thunks?: DescriptorTree | (value, arg, key) => Descriptor,
    scorch?: DescriptorTree,
    callback?: (descriptor, arg) => Descriptor
  },
  arg: any
): Descriptor
```
### Interfaces
- `Descriptor`: see [@kingjs/descriptor][descriptor]
### Parameters
- `this`: The `Descriptor` whose property values will be mapped.
- `action`: The callback which maps property values.
### Returns
A descriptor with mapped property values.
### Remarks
Inflate will only invoke functions named `$`.
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/descriptor.map
```
## License
MIT

![Analytics](https://analytics.kingjs.net/descriptor/map)

  [descriptor]: https://www.npmjs.com/package/@kingjs/descriptor