# @[kingjs][@kingjs]/[linq][ns0].[contains][ns1]
Returns true if a sequence contains  a specified element.
## Usage
```js
require('kingjs')
var Contains = require('@kingjs/linq.contains');
var assert = require('assert');

assert([1, 2, 3][Contains](2));

var people = [
  { name: 'Alice' },
  { name: 'Bob' },
  { name: 'Chris' },
];

var equal = function(l, r) { 
  return l.name == r.name; 
}

assert(people[Contains]({ name: 'Chris' }, equal));
```

## API
```ts
contains()
```




## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/linq.contains
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/i-enumerable`](https://www.npmjs.com/package/@kingjs/i-enumerable)|`latest`|
|[`@kingjs/i-enumerator`](https://www.npmjs.com/package/@kingjs/i-enumerator)|`latest`|
|[`@kingjs/linq.default-equal`](https://www.npmjs.com/package/@kingjs/linq.default-equal)|`latest`|
|[`@kingjs/reflect.export-extension`](https://www.npmjs.com/package/@kingjs/reflect.export-extension)|`latest`|
## Source
https://repository.kingjs.net/linq/contains
## License
MIT

![Analytics](https://analytics.kingjs.net/linq/contains)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/linq
[ns1]: https://www.npmjs.com/package/@kingjs/linq.contains
