# @[kingjs](https://www.npmjs.com/package/kingjs)/[descriptor](https://www.npmjs.com/package/@kingjs/descriptor).clear
Returns a descriptor with a named property removed.
## Usage
Remove the property 'x' like this:
```js
var clear = require('@kingjs/descriptor.clear');

var descriptor = { x:0 };
clear.call(descriptor, 'x');
```
result:
```js
{ }
```
## API
```ts
declare function clear(
  this: Descriptor,
  name: string,
  copyOnWrite?: boolean
): Descriptor
```
### Interfaces
- `Descriptor`: see [@kingjs/descriptor][descriptor]
### Parameters
- `this`: The descriptor from which property 'name' will be removed.
- `name`: The name of the property to be removed.
- `copyOnWrite`: If true, will return a copy of the descriptor assuming the property `name` exists on descriptor to begin with. 
### Returns
Returns a descriptor with property `name` removed. A copy is returned if the descriptor has a property named `name` and either `copyOnWrite` is true, or the descriptor is frozen, or the descriptor has an inherited property of `name`.  
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/descriptor.clear
```
## License
MIT

![Analytics](https://analytics.kingjs.net/descriptor/clear)


  [descriptor]: https://www.npmjs.com/package/@kingjs/descriptor