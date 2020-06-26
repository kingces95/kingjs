var { assert,
  '@kingjs': {
    Path,
    IComparable,
    IEquatable,
    IComparable: { CompareTo },
    IEquatable: { Equals, GetHashcode },
    '-fs': {
      '-dir': { DirEntry },
    }
  }
} = module[require('@kingjs-module/dependencies')]()

class Dirent {
  constructor(name) {
    this.name = name
  }

  isFile() { return false }
  isDirectory() { return false }
  isSymbolicLink() { return false }
  isSocket() { return false }
  isBlockDevice() { return false }
  isCharacterDevice() { return false }
  isFIFO() { return false }
}
class FileEnt extends Dirent {
  constructor(name) { super(name) }
  isFile() { return true }
}
class DirectoryEnt extends Dirent {
  constructor(name) { super(name) }
  isDirectory() { return true }
}
class SocketEnt extends Dirent {
  constructor(name) { super(name) }
  isSocket() { return true }
}
class SymbolicLinkEnt extends Dirent {
  constructor(name) { super(name) }
  isSymbolicLink() { return true }
}
class BlockDeviceEnt extends Dirent {
  constructor(name) { super(name) }
  isBlockDevice() { return true }
}
class CharacterDeviceEnt extends Dirent {
  constructor(name) { super(name) }
  isCharacterDevice() { return true }
}
class FifoEnt extends Dirent {
  constructor(name) { super(name) }
  isFIFO() { return true }
}

var name = 'foo.txt'

var activate = o => new DirEntry(o, Path.dot)
var file = activate(new FileEnt(name))
var otherFile = activate(new FileEnt('bar'))
var directory = activate(new DirectoryEnt(name))
var socket = activate(new SocketEnt(name))
var symbolicLink = activate(new SymbolicLinkEnt(name))
var blockDevice = activate(new BlockDeviceEnt(name))
var characterDevice = activate(new CharacterDeviceEnt(name))
var fifo = activate(new FifoEnt(name))

assert.equal(file.name, name)
assert.equal(file.path, Path.dot)

assert.ok(file.isFile)
assert.ok(!file.isDirectory)
assert.ok(directory.isDirectory)
assert.ok(socket.isSocket)
assert.ok(symbolicLink.isSymbolicLink)
assert.ok(blockDevice.isBlockDevice)
assert.ok(characterDevice.isCharacterDevice)
assert.ok(fifo.isFifo)

assert.ok(file instanceof IEquatable)
assert.ok(file[Equals](file))
assert.ok(!file[Equals](otherFile))
assert.ok(!file[Equals](directory))
assert.equal(file[GetHashcode](), file[GetHashcode]())
assert.notEqual(file[GetHashcode](), otherFile[GetHashcode]())

assert.ok(file instanceof IComparable)
assert.ok(!file[CompareTo](file))
assert.ok(!file[CompareTo](otherFile))
assert.ok(otherFile[CompareTo](file))
assert.ok(directory[CompareTo](file))
assert.ok(!file[CompareTo](directory))