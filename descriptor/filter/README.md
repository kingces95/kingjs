# @[kingjs](https://www.npmjs.com/package/kingjs)/[descriptor](https://www.npmjs.com/package/@kingjs/descriptor).filter
Creates a new descriptor with properties filtered by a callback.
## Usage
Create a new descriptor which includes properties named `include` or a value of 0 like this:
```js
var filter = require('@kingjs/descriptor.filter');

filter.call({
  zero: 0,
  include: null,
  exclude: null,
}, (value, name) => 
  name == 'include' || value == 0, 
);
```
result:
```js
{
  include: null,
  zero: 0,
}
```
## API
```ts
declare function filter(
  this: Descriptor,
  predicate: (value: any, name: string): boolean
): Descriptor
```
### Interfaces
- `Descriptor`: see [@kingjs/descriptor][descriptor]
### Parameters
- `this`: The descriptor whose properties will be filtered and copied to a new descriptor.
- `predicate`: A predicate used to test which properties should be copied to the filtered descriptor.
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/descriptor.filter
```
## License
MIT

![Analytics](https://analytics.kingjs.net/descriptor/filter)

  [descriptor]: https://www.npmjs.com/package/@kingjs/descriptor
