require('@kingjs/shim')
var assert = require('assert')
var fs = require('fs')
var Path = require('path')
var { Next, Complete } = require('@kingjs/rx.i-observer')
var { Subscribe } = require('@kingjs/rx.i-observable')
var SelectMany = require('@kingjs/rx.select-many')
var Do = require('@kingjs/rx.do')
var Log = require('@kingjs/rx.log')
var PathSubject = require('@kingjs/fs.rx.path-subject')
var PathBuffer = require('@kingjs/path-buffer')
var Watcher = require('..')

var TempDirName = 'testDir'
var TempFileName = 'file.txt'
process.chdir(TempDirName)

var result = []
var watcher = new Watcher()
var dirPath = watcher.pwd
var dirStats = fs.statSync(dirPath.buffer)
var dir = inodes.allocate(dirStats)
assert(dir.isDirectory)
assert(dirStats.ino in inodes.heap)

var fileBuffer = dirBuffer.joinWith(TempFileName)
var fileStats = fs.statSync(fileBuffer.buffer)
var file = inodes.allocate(fileStats)
assert(file.isFile)
assert(fileStats.ino in inodes.heap)
