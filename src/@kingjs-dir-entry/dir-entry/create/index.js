var { assert, 
  '..': { File, Dir, SymbolicLink, CharacterDevice, BlockDevice, Socket, Fifo }
} = module[require('@kingjs-module/dependencies')]()

function create(dirent, dir) {
  var path = dir.to(dirent.name)

  if (dirent.isFile()) 
    return new File(path)

  if (dirent.isDirectory()) 
    return new Dir(path)

  if (dirent.isSymbolicLink()) 
    return new SymbolicLink(path)

  if (dirent.isSocket()) 
    return new Socket(path)

  if (dirent.isBlockDevice()) 
    return new BlockDevice(path)

  if (dirent.isCharacterDevice()) 
    return new CharacterDevice(path)

  assert.ok(dirent.isFIFO())
  return new Fifo(path)
}


module.exports = create