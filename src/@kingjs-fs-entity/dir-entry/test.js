var {
  '@kingjs': { Path,
    '-fs-entity': {
      DirEntry,
      DirEntry: { File, Dir, SymbolicLink }
    } 
  }
} = module[require('@kingjs-module/dependencies')]()

require('../../@kingjs-fs/exists/test-fs')({
  dot: Dir.dot,

  // general
  exists: o => o.existsAsync(),
  rename: (o, t) => o.renameAsync(t),
  getMTime: async (o, opt) => (await o.statAsync(opt)).mtimeMs,
  getIno: async (o, opt) => (await o.statAsync(opt)).ino,

  // directory
  list: o => o.listAsync(), 
  make: (o, n) => o.createAsync(n), 
  remove: o => o.removeAsync(),
  isDirectory: o => o.isDirectory,
  isFile: o => o.isFile,
  isSymbolicLink: o => o.isSymbolicLink,
  getName: o => o.name,

  // file
  copy: (o, n) => o.copyAsync(o.path.dir, { name: n }),
  read: (o, opt) => o.readAsync(opt),
  write: (o, n, t, opt) => o.writeAsync(n, t, opt),
  unlink: o => o.unlinkAsync(),
})