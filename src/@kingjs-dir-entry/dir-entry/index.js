var {
  '.': { DirEntry, File, Dir, SymbolicLink, CharacterDevice, BlockDevice, Socket, Fifo }
} = module[require('@kingjs-module/dependencies')]()

DirEntry.File = File
DirEntry.Dir = Dir
DirEntry.SymbolicLink = SymbolicLink
DirEntry.CharacterDevice = CharacterDevice
DirEntry.BlockDevice = BlockDevice
DirEntry.Socket = Socket
DirEntry.File = Fifo

module.exports = DirEntry