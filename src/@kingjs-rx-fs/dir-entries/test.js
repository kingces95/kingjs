require('@kingjs/shim')
var assert = require('assert')
var { Next, Complete } = require('@kingjs/rx.i-observer')
var { Subscribe } = require('@kingjs/rx.i-observable')
var SelectMany = require('@kingjs/rx.select-many')
var Do = require('@kingjs/rx.do')
var Log = require('@kingjs/rx.log')
var PathSubject = require('@kingjs/fs.rx.path-subject')
var DirEntries = require('..')

//create testDir/file.txt
var TempDirName = 'testDir'
var TempFileName = 'file.txt'

var result = []
var subject = new PathSubject(TempDirName)

subject
  [DirEntries]()
  [Log]('DIR', '${path}')
  [Do](o => assert(o.parent == subject))
  [Do](o => result.push(o))
  [SelectMany](entry => entry
    [Do](
      o => result.push(o),
      () => result.push('COMPLETE FILE'),
    )
  )
  [Subscribe](
    null,
    () => {
      result.push('COMPLETE DIR')

      var i = 0
      assert(result[i] instanceof PathSubject)
      assert(result[i++].basename == TempFileName)

      assert(result[i].constructor.name == 'Dirent')
      assert(result[i++].name === TempFileName)
      
      assert(result[i++] == 'COMPLETE FILE')
      assert(result[i++] == 'COMPLETE DIR')
      }
  )

subject[Next](null)
subject[Complete]()