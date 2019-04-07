require('@kingjs/shim')
var assert = require('assert');
var path = require('path');
var SelectDirEntries = require('..');
var watch = require('@kingjs/fs.watch');
var makeAbsolute = require('@kingjs/path.make-absolute');
var { Subscribe } = require('@kingjs/i-observable');
var { Next } = require('@kingjs/i-observer');
var SelectMany = require('@kingjs/rx.select-many');
var Subject = require('@kingjs/rx.subject');
var Distinct = require('@kingjs/rx.distinct');
var Pipe = require('@kingjs/rx.pipe');
var Select = require('@kingjs/rx.select');
var Where = require('@kingjs/rx.where');
var Spy = require('@kingjs/rx.spy');

async function run() {

  var subject = new Subject();

  // emit when any dir activity detected
  var motion = subject
    [Select](o => makeAbsolute(o));

  // emit newly discovered dirs
  var distinct = motion
    [Distinct]();
  
  // walk sub-dirs of newly discovered dirs
  distinct
    [SelectDirEntries]()
    [Where](o => o.isDirectory())
    [Select](o => path.join(o.dir, o.name))
    [Pipe](subject);

  // watch newly discovered dirs
  distinct
    [SelectMany](o => watch(o))
    [Pipe](subject);
    
  motion
    [Subscribe](o => console.log('DIR MOTION', o));

  motion
    [SelectDirEntries]()
    [Where](o => o.isFile())
    [Select](o => path.join(o.dir, o.name))
    [Subscribe](o => console.log('FILE', o));

  subject[Next]('.');
}
run();