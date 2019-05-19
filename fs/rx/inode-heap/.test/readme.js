require('@kingjs/shim')
var assert = require('assert')
var fs = require('fs')
var PathBuffer = require('@kingjs/path-buffer')
var InodeHeap = require('..')

var TempDirName = 'testDir'
var TempFileName = 'file.txt'

var inodes = new InodeHeap()

var dirBuffer = PathBuffer.create(TempDirName)
var dirStats = fs.statSync(dirBuffer.buffer)
var dir = inodes.allocate(dirStats)
assert(dir.isDirectory)
assert(dirStats.ino in inodes.heap)

var fileBuffer = dirBuffer.joinWith(TempFileName)
var fileStats = fs.statSync(fileBuffer.buffer)
var file = inodes.allocate(fileStats)
assert(file.isFile)
assert(fileStats.ino in inodes.heap)
