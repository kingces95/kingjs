'use strict';

var schema = require('./schema');

var Loader = schema.Loader;
var loader = Loader.builtIn;
var IEnumeratorType = loader.resolve('IEnumerator');
var IEnumerator = IEnumeratorType.load();

Object.defineProperties(module, {
  exports: { value: IEnumerator }
});