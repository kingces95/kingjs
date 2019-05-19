var { 
  fs: { promises: fsp }, 
  ['@kingjs']: {
    fs: {
      rx: { 
        subject: {
          Inode: InodeSubject,
          Dirent: DirentSubject
        }
      }
    },
    rx: {
      RollingSelect,
      SelectMany,
      GroupBy,
    },
    linq: { 
      ZipJoin, 
    },
  }
} = require('./dependencies')

class DirSubject extends InodeSubject {
  constructor(ino) {
    super(ino, names => names
      [RollingSelect](
        o => o[0][ZipJoin](o[1]))                 // dirEntry[] -> {outer, inner, key}[]
      [SelectMany]()                              // {outer, inner, key}[] -> {outer, inner, key}
      [GroupBy](                                  // new = link, next = any, complete = unlink
        o => o.key,                               // group by entry name
        o => new DirentSubject(this, o),          // activate group for entry
        o => null,                                // select null
        o => !o.outer                             // emit `complete` on unlinked
      )
    )
  }

  get isDirectory() { return true }
}

module.exports = DirSubject