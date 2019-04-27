require('@kingjs/shim')
var Path = require('path')
var watchMany = require('..')
var { Subscribe } = require('@kingjs/rx.i-observable')
var { Key } = require('@kingjs/rx.i-grouped-observable')
var Log = require('@kingjs/rx.log')
var Spy = require('@kingjs/rx.spy')

var watch = watchMany('.');
var changeId = 0;

watch
  [Subscribe](
    path => { 
      var name = Path.basename(path[Key]);
      console.log('OPEN PATH', name)

      path[Subscribe](
        iNode => {
          var id = iNode[Key]
          console.log('LINK', name, id)

          iNode[Subscribe](
            stats => console.log('CHANGE', changeId++, name, id, stats.ctimeMs),
            () => console.log('UNLINK', name, id)
          )
        }, 
        () => console.log('CLOSE PATH', name)
      )
    },
    path => console.log('COMPLETE')
  )