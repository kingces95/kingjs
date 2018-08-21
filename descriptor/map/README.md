# @[kingjs](https://www.npmjs.com/package/kingjs)/[descriptor](https://www.npmjs.com/package/@kingjs/descriptor).map
Returns a new descriptor whose properties are those found on `this` whose values have been transformed by a callback.
## Usage
Map a descriptor of lowercase letters to uppercase letters.
```js
var map = require('@kingjs/descriptor.map');

map.call({
  apple: 'a',
  orange: 'o',
  banana: 'b'
}, function(x) { 
  return String.prototype.toUpperCase.call(x); 
})
```
result:
```js
{
  apple: 'A',
  orange: 'O',
  banana: 'B'
}
```
## API
```ts
declare function map(
  this: Descriptor,
  callback(
    name: string, 
    descriptor: Descriptor
  ): any
): Descriptor
```
### Interfaces
- `Descriptor`: see [@kingjs/descriptor][descriptor]
### Parameters
- `this`: The descriptor to map.
- `callback`: Function that returns a property value of the resulting descriptor.
  - `this`: The descriptor being mapped.
  - `value`: The current value being mapped.
  - `name`: Than property name of the value being mapped.
### Returns
Returns a new descriptor whose properties are those found on `this` whose values have been transformed by the callback.
## Remarks
The list of properties to map is set before the first callback is made. So if properties are added to the descriptor during mapping they will not be included in the resulting descriptor.
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/descriptor.map
```
## License
MIT

![Analytics](https://analytics.kingjs.net/descriptor/map)

  [descriptor]: https://www.npmjs.com/package/@kingjs/descriptor