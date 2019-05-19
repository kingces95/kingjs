require('@kingjs/shim')
var assert = require('assert')
var DirSubject = require('@kingjs/fs.rx.subject.dir')
var DirentSubject = require('..')

var dir = new DirSubject(0)
var dirent = new DirentSubject(dir, 'foo')

assert(dirent.dir == dir)
assert(dirent.name == 'foo')