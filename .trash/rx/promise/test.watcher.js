require('@kingjs/shim')
var assert = require('assert')
var path = require('path')
var SelectDirEntries = require('..')
var SelectStat = require('@kingjs/fs.select-stat')
var watch = require('@kingjs/fs.watch')
var makeAbsolute = require('@kingjs/path.make-absolute')
var { Subscribe } = require('@kingjs/rx.i-observable')
var { Next } = require('@kingjs/rx.i-observer')
var SelectMany = require('@kingjs/rx.select-many')
var Subject = require('@kingjs/rx.subject')
var Distinct = require('@kingjs/rx.distinct')
var DistinctUntilChanged = require('@kingjs/rx.distinct-until-changed')
var Pipe = require('@kingjs/rx.pipe')
var Select = require('@kingjs/rx.select')
var Where = require('@kingjs/rx.where')
var GroupBy = require('@kingjs/rx.group-by')
var Log = require('@kingjs/rx.log')

async function run() {

  var subject = new Subject()

  // emit when any dir activity detected
  var motion = subject
    [Select](o => makeAbsolute(o))
  
  // walk sub-dirs of newly discovered dirs
  motion
    [GroupBy](o => o.path)
    [SelectMany](
      o => o[DistinctUntilChanged]()
    )
    [SelectDirEntries]()
    [Where](o => o.isDirectory())
    [Select](o => path.join(o.dir, o.name))
    [Pipe](subject)

  // watch newly discovered dirs
  motion
    [Distinct]()
    [Log]('WATCH_DIR')
    [SelectMany](o => watch(o))
    [Log]('DIR_MOTION')
    [Pipe](subject)

  motion
    [SelectDirEntries]()
    [Where](o => o.isFile())
    [Select](o => path.join(o.dir, o.name))
    [SelectStat]()
    [Select](
      o => ({ path: o.path, timestamp: o.mtimeMs })
    )
    [GroupBy](o => o.path)
    [SelectMany](
      o => o[DistinctUntilChanged]()
    )
    [Select](o => o.path)
    [Subscribe](o => console.log('FILE', o))

  subject[Next]('.')
}
run()