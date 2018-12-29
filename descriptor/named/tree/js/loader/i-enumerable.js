'use strict';

var schema = require('./schema');

var Loader = schema.Loader;
var loader = Loader.builtIn;
var IEnumerableType = loader.resolve('IEnumerable');
var IEnumerable = IEnumerableType.load();

Object.defineProperties(module, {
  exports: { value: IEnumerable }
});