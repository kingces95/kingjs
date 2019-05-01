require('@kingjs/shim')
var Path = require('path')
var watchMany = require('..')
var { Complete, Next } = require('@kingjs/rx.i-observer')
var { Subscribe } = require('@kingjs/rx.i-observable')
var { Key } = require('@kingjs/rx.i-grouped-observable')
var Log = require('@kingjs/rx.log')

var changeId = 0
var cwd = process.cwd()

var subject = watchMany('.')

subject
  [Subscribe](
    iNode => {
      var path = iNode.path
      var name = path ? Path.relative(cwd, path) : '?'
      var id = iNode[Key]
      console.log('LINK', name, id)

      iNode[Subscribe](
        stats => console.log('CHANGE', changeId++, name, id, stats.ctimeMs),
        () => console.log('UNLINK', name, id)
      )
    }, 
    () => console.log('CLOSE')
  )

setTimeout(() => {
  subject[Complete]()
}, 500);