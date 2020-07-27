var {
  '@kingjs': { Path,
    '-fs': { Exists, Stat, Rename,
      '-dir': { List, Make, Remove, },
      '-file': { Copy, Read, Unlink, Write, },
      '-link': { }
    } 
  }
} = module[require('@kingjs-module/dependencies')]()

require('./test-fs')({
  dot: Path.dot,

  // general
  exists: o => o[Exists](o),
  rename: (o, t) => { o[Rename](o.dir.to(t)); return o.dir.to(t) },
  getMTime: (o, opt) => o[Stat](opt).mtimeMs,
  getIno: (o, opt) => o[Stat](opt).ino,

  // directory
  list: o => o[List](), 
  make: (o, n) => { o.to(n)[Make](); return o.to(n) }, 
  remove: o => o[Remove](),
  isDirectory: o => o.isDirectory(),
  isFile: o => o.isFile(),
  isSymbolicLink: o => o.isSymbolicLink(),
  getName: o => o.name,

  // file
  copy: (o, t) => { o[Copy](o.dir.to(t)); return o.dir.to(t) },
  read: (o, opt) => o[Read](opt),
  write: (o, n, t, opt) => { o.to(n)[Write](t, opt); return o.to(n) },
  unlink: o => o[Unlink](),
})