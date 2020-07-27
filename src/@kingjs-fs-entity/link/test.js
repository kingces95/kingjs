var { assert,
  '@kingjs': {
    Path,
    IComparable,
    IEquatable,
    IComparable: { IsLessThan },
    IEquatable: { Equals, GetHashcode },
    '-fs-entity': { DirEntry },
  }
} = module[require('@kingjs-module/dependencies')]()

// https://unix.stackexchange.com/questions/230540/creating-a-character-device-file

// mock dirent types
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

// activate stub with mock path
var activate = o => DirEntry.create(o, Path.dot)

var name = 'foo.txt'
var file = activate(new FileEnt(name))
var otherFile = activate(new FileEnt('bar'))
assert.ok(file.isFile)
assert.ok(!file.isDirectory)
assert.ok(file instanceof IEquatable)
assert.ok(file[Equals](file))
assert.ok(!file[Equals](otherFile))
assert.ok(!file[Equals]())
assert.equal(file[GetHashcode](), file[GetHashcode]())
assert.notEqual(file[GetHashcode](), otherFile[GetHashcode]())
assert.ok(file instanceof IComparable)
assert.ok(!file[IsLessThan](file))
assert.ok(!file[IsLessThan](otherFile))
assert.ok(otherFile[IsLessThan](file))
assert.equal(file.name, name)
assert.equal(file.path.parent, Path.dot)

var directory = activate(new DirectoryEnt(name))
assert.ok(!file[Equals](directory))
assert.ok(directory.isDirectory)
assert.ok(!directory[IsLessThan](file))
assert.ok(file[IsLessThan](directory))

var symbolicLink = activate(new SymbolicLinkEnt(name))
assert.ok(symbolicLink.isSymbolicLink)

var socket = activate(new SocketEnt(name))
assert.ok(socket.isSocket)

var blockDevice = activate(new BlockDeviceEnt(name))
assert.ok(blockDevice.isBlockDevice)

var characterDevice = activate(new CharacterDeviceEnt(name))
assert.ok(characterDevice.isCharacterDevice)

var fifo = activate(new FifoEnt(name))
assert.ok(fifo.isFifo)


