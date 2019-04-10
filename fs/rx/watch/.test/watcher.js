require('@kingjs/shim')
var { promises: fsp } = require('fs');
var assert = require('assert');
var Path = require('path');
var { Subscribe } = require('@kingjs/rx.i-observable');
var { Next } = require('@kingjs/rx.i-observer');

var watch = require('..');
var makeAbsolute = require('@kingjs/path.make-absolute');

var Subject = require('@kingjs/rx.subject');
var QueueMany = require('@kingjs/rx.queue-many');
var Queue = require('@kingjs/rx.queue');
var Select = require('@kingjs/rx.select');
var SelectMany = require('@kingjs/rx.select-many');
var Distinct = require('@kingjs/rx.distinct');
var DistinctUntilChanged = require('@kingjs/rx.distinct-until-changed');
var Pipe = require('@kingjs/rx.pipe');
var Where = require('@kingjs/rx.where');
var GroupBy = require('@kingjs/rx.group-by');
var Log = require('@kingjs/rx.log');

async function run() {

  // report activity in directories
  var directoryMotion = new Subject();

  // if the directory is unknown, 
  // - start watching it and 
  // - reporting its contents when it moves
  var entryMotion = directoryMotion
    [Select](o => makeAbsolute(o))
    [Distinct]()
    [Log]('WATCH_DIR')
    [SelectMany](o => watch(o, true))
    [QueueMany](async o => { 
        try { return await fsp.readdir(o, { withFileTypes: true }); }
        catch(e) { /* lost race to readdir before deletion */ }
      },
      (o, x) => (x.dir = o, x)
    )
    [Where](o => o)

  // report sub-directory motion as feedback
  entryMotion
    [Where](o => o.isDirectory())
    [Where](o => o.name[0] != '.')
    [Select](o => Path.join(o.dir, o.name))
    [Pipe](directoryMotion);

  // report only those files that have changed since last seen
  var fileMotion = entryMotion
    [Where](o => o.isFile())
    [Select](o => Path.join(o.dir, o.name))
    [Queue](async o => {
      try { return ({ path: o, timestamp: (await fsp.stat(o)).mtimeMs }) }
      catch(e) { /* lost race to get stats before deletion */ }
    })
    [Where](o => o)
    [GroupBy](o => o.path)
    [SelectMany](
      o => o[DistinctUntilChanged](),
      (o, x) => x.path
    );

  fileMotion
    [Subscribe](o => console.log('FILE', o));

  //directoryMotion[Next]('../../../..');
  directoryMotion[Next]('.');
}
run();