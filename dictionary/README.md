# @[kingjs][@kingjs]/[dictionary][ns0]
A dictionary.
## Usage
```js
'use strict';

var Dictionary = require(`.`);
var require = require(`@kingjs/dictionary`);
var assert = require(`assert`);

var dictionary = new Dictionary();
assert('toString' in dictionary == false);
assert(Object.keys(dictionary) == 0);

var object = { };
assert('toString' in object == true);
assert(Object.keys(object) == 0);

```

## API
```ts
Dictionary()
```


### Remarks
Javascript objects are often used as dictionaries  of strings to values. This is bad practice! An empty Javascript object is _not_ an empty dictionary. It contains a  `'toString'` key visible to the `in` operator.

## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/dictionary
```

## Source
https://repository.kingjs.net/dictionary
## License
MIT

![Analytics](https://analytics.kingjs.net/dictionary)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/dictionary
