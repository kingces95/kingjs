var assert = require('assert')
var ExportExtension = require('@kingjs-module/export-extension')

module[ExportExtension](  
  Array, 
  function getLength() { return this.length }
)

var GetLength = module.exports

assert.equal([1, 2, 3][GetLength](), 3)