var {
  '@kingjs': { Path,
    '-fs-promises': { Exists, Stat, Rename,
      '-dir': { List, Make, Remove, },
      '-file': { Copy, Read, Unlink, Write, },
      '-link': { }
    } 
  }
} = module[require('@kingjs-module/dependencies')]()

require('../../@kingjs-fs/exists/test-fs')({
  dot: Path.dot,

  // general
  exists: o => o[Exists](o),
  rename: async (o, t) => { await o[Rename](o.dir.to(t)); return o.dir.to(t) },
  getMTime: async (o, opt) => (await o[Stat](opt)).mtimeMs,
  getIno: async (o, opt) => (await o[Stat](opt)).ino,

  // directory
  list: o => o[List](), 
  make: async (o, n) => { await o.to(n)[Make](); return o.to(n) }, 
  remove: o => o[Remove](),
  isDirectory: o => o.isDirectory(),
  isFile: o => o.isFile(),
  isSymbolicLink: o => o.isSymbolicLink(),
  getName: o => o.name,

  // file
  copy: async (o, t) => { await o[Copy](o.dir.to(t)); return o.dir.to(t) },
  read: (o, opt) => o[Read](opt),
  write: async (o, n, t, opt) => { await o.to(n)[Write](t, opt); return o.to(n) },
  unlink: o => o[Unlink](),
})