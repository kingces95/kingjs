var assert = require('assert')
var ExportStaticExtension = require('@kingjs-module/export-static-extension')

module[ExportStaticExtension](  
  Array, 
  function getName() { return this.name }
)

var GetName = module.exports

assert.equal(Array[GetName](), 'Array')