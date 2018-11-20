'use strict';

var is = require('@kingjs/is');
var objectEx = require('@kingjs/object-ex');
var assert = require('@kingjs/assert');

var npmName = '@kingjs/descriptor.named.tree';
var symbolRoot = npmName + period + 'info';
var symbol = {
  fields = Symbol.for(symbolRoot + period + 'fields'),
  defaults = Symbol.for(symbolRoot + period + 'defaults'),
  mergedDefaults = Symbol.for(symbolRoot + period + 'defaults'),
  childrenCtors = Symbol.for(symbolRoot + period + 'children'),
  childrenDefaults = Symbol.for(symbolRoot + period + 'childrenDefaults'),
  mergedChildrenDefaults = Symbol.for(symbolRoot + period + 'childrenDefaults'),
}

function Attribute() { }

objectEx.defineFunctions(Attribute, {
  setFields: (func, info) => { func[symbol.fields] = info },
  getFields: (func) => func[symbol.fields],

  setDefaults: (func, info) => { func[symbol.defaults] = info },
  getDefaults: (func) => func[symbol.defaults],

  setMergedDefaults: (func, info) => { func[symbol.mergedDefaults] = info },
  getMergedDefaults: (func) => func[symbol.mergedDefaults],

  setChildrenCtors: (func, info) => { func[symbol.childrenCtors] = info },
  getChildrenCtors: (func) => func[symbol.childrenCtors],

  setChildrenDefaults: (func, info) => { func[symbol.childrenDefaults] = info },
  getChildrenDefaults: (func) => func[symbol.childrenDefaults],

  setMergedChildrenDefaults: (func, info) => { func[symbol.mergedChildrenDefaults] = info },
  getMergedChildrenDefaults: (func) => func[symbol.mergedChildrenDefaults],
})

Object.defineProperties(module, {
  exports: { value: Attribute }
});