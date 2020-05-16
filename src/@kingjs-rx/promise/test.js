require('@kingjs/shim')
var assert = require('assert')
var fs = require('fs')
var SelectDirEntries = require('..')
var watch = require('@kingjs/fs.watch')
var First = require('@kingjs/rx.first')
var Select = require('@kingjs/rx.select')

var fileName = 'temp'

async function run() {

  var promise = watch()
    [SelectDirEntries]()
    [Select](o => o.name)
    [First](o => o == fileName)

  fs.writeFileSync(fileName)
  var result = await promise
  assert(fileName == result)
  fs.unlinkSync(fileName)
}
run()