# @[kingjs](https://www.npmjs.com/package/kingjs)/dictionary

A dictionary.

## Usage
Create a object for which the `in` operator returns `false` for all values including `'toString'` like this:
```js
'toString' in new Dictionary();
```
result:
```js
false
```

## API
```ts
declare class Dictionary { }
```
## Remarks
Javascript objects are often used as dictionaries of strings to values. This is bad practice! An empty Javascript object is _not_ an empty dictionary. It contains a `'toString'` key visible to the `in` operator. 

## Install
With [npm](https://npmjs.org/) installed, run

```
$ npm install @kingjs/dictionary
```

## License

MIT

![Analytics](https://analytics.kingjs.net/dictionary)