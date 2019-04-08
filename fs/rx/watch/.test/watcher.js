require('@kingjs/shim')
var { promises: fsp } = require('fs');
var assert = require('assert');
var Path = require('path');
var { Subscribe } = require('@kingjs/i-observable');
var { Next } = require('@kingjs/i-observer');

var watch = require('..');
var makeAbsolute = require('@kingjs/path.make-absolute');

var from = require('@kingjs/rx.from');
var Subject = require('@kingjs/rx.subject');
var Select = require('@kingjs/rx.select');
var SelectMany = require('@kingjs/rx.select-many');
var SelectAsync = require('@kingjs/rx.select-async');
var Distinct = require('@kingjs/rx.distinct');
var DistinctUntilChanged = require('@kingjs/rx.distinct-until-changed');
var Pipe = require('@kingjs/rx.pipe');
var Where = require('@kingjs/rx.where');
var GroupBy = require('@kingjs/rx.group-by');
var Log = require('@kingjs/rx.log');

async function run() {

  var subject = new Subject();

  // emit when any dir activity detected
  var motion = subject
    [Select](o => makeAbsolute(o));

  // watch newly discovered dirs
  motion
    [Distinct]()
    [Log]('WATCH_DIR')
    [SelectMany](o => watch(o))
    [Log]('DIR_MOTION')
    [Pipe](subject);
  
  var entries = motion
    [SelectAsync](async o => 
      (await fsp.readdir(o, { withFileTypes: true }))
        .map(x => (x.dir = o, x))
    )
    [SelectMany](o => from(o))

  // walk sub-dirs of newly discovered dirs
  entries
    // [GroupBy](o => o.path)
    // [SelectMany](
    //   o => o[DistinctUntilChanged]()
    // )
    [Where](o => o.isDirectory())
    [Select](o => Path.join(o.dir, o.name))
    [Pipe](subject);

  entries
    [Where](o => o.isFile())
    [Select](o => Path.join(o.dir, o.name))
    [SelectAsync](async o => 
      ({ path: o, timestamp: (await fsp.stat(o)).mtimeMs })
    )
    [GroupBy](o => o.path)
    [SelectMany](
      o => o[DistinctUntilChanged]()
    )
    [Select](o => o.path)
    [Subscribe](o => console.log('FILE', o));

  subject[Next]('.');
}
run();