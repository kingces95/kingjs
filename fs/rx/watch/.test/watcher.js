require('@kingjs/shim')
var deepEqual = require('deep-equal');
var { promises: fsp } = require('fs');
var assert = require('assert');
var Path = require('path');
var { Subscribe } = require('@kingjs/rx.i-observable');
var { Next } = require('@kingjs/rx.i-observer');

var watch = require('..');
var makeAbsolute = require('@kingjs/path.make-absolute');

var RollingSelect = require('@kingjs/rx.rolling-select');
var Subject = require('@kingjs/rx.subject');
var Queue = require('@kingjs/rx.queue');
var Select = require('@kingjs/rx.select');
var SelectMany = require('@kingjs/rx.select-many');
var Distinct = require('@kingjs/rx.distinct');
var Pipe = require('@kingjs/rx.pipe');
var Where = require('@kingjs/rx.where');
var GroupBy = require('@kingjs/rx.group-by');
var Log = require('@kingjs/rx.log');

var ZipJoin = require('@kingjs/linq.zip-join');

var SelectName = o => o.name;
var WithFileTypes = { withFileTypes: true };
var Remove = 'remove';
var Add = 'add';
var Change = 'change';
var SelectName = o => o.name;

function readDirStat(dir) {
  var stats = [];

  try { 
    var entries = await fsp.readdir(dir, WithFileTypes);
    entries.sort(SelectName);

    for (var i = 0; i < entries.length; i++) {
      var path = Path.join(dir, entries[i].name);

      try { 
        stats.push(await fsp.stat(path)); 
      } catch(e) { }
    }
  }
  catch(e) { }

  return stats;
}

function diffStat(current, previous) {
  var entry = current || previous;
  var name = entry.name;
  var event = current ? (previous ? Change : Remove) : Add;

  // return null when no changes are detected
  if (event == Change && deepEqual(current, previous))
    return null;

  return { entry, name, event };
}

async function run(dirFilter) {

  var directoryMotion = new Subject();

  var entryMotion = directoryMotion
    [Select](o => makeAbsolute(o))
    [Distinct]()
    [Log]('WATCH_DIR')
    [SelectMany](o => watch(o, true), o => o)
    [GroupBy](o => o)    
    [SelectMany](o => o
      [Queue](() => readDirStat(o.key))
      [RollingSelect](1, 
        (c, p) => c[ZipJoin](p, SelectName, SelectName, diffStat)
      )
      [Where](o => o),
      x => (x.dir = o, x)
    )

  // report sub-directory motion as feedback
  entryMotion
    [Where](o => o.entry.isDirectory())
    [Where](o => dirFilter(o.name, o.dir))
    [Select](o => Path.join(o.dir, o.name))
    [Pipe](directoryMotion);

  entryMotion
    [Subscribe](o => console.log('FILE', o));

  //directoryMotion[Next]('../../../..');
  directoryMotion[Next]('.');
}
run(o => o[0] != '.');