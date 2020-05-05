var assert = require('assert')
var GetPackageNames = require('..')
var GetDependencies = require('@kingjs/source.get-dependencies')
var parse = require('@kingjs/source.parse')
var { ObjectBindingPattern } = require('@kingjs/source.types')

parse('./source.js').then(ast => {
  var obp = ast[GetDependencies]();
  var packageNames = obp[GetPackageNames]('kingjs')
  assert(packageNames[0] == 'fs')
  assert(packageNames[1] == 'child_process')
  assert(packageNames[2] == '@kingjs/promises')
  assert(packageNames[3] == '@kingjs/foo-bar.baz')
})