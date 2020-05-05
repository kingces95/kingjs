var { 
  ['@kingjs']: {
    fs: {
      rx: { 
        subject: {
          Inode: InodeSubject,
        }
      }
    },
    rx: {
      Subject,
      RollingSelect,
      SelectMany,
      GroupBy,
      Where,
      Pool
    },
    linq: { 
      ZipJoin, 
    },
  }
} = module[require('@kingjs-module/dependencies')]()

class RealDirSubject extends Subject { }
var createSubject = () => new RealDirSubject()

class DirEntry extends Subject {
  constructor(name) {
    super()

    this.name = name
  }
}

class DirSubject extends InodeSubject {
  constructor(ino) {
    super(ino, createSubject, names => names
      [Pool](o => o)                              // Serialize the fetching of directory entries
      [RollingSelect](
        o => o[0][ZipJoin](o[1])                  // dirEntry[] -> {outer, inner, key}[]
      )                 
      [SelectMany]()                              // {outer, inner, key}[] -> {outer, inner, key}
      [Where](o => o.inner != o.outer)
      [GroupBy](                                  // new = link, next = any, complete = unlink
        o => o.key,                               // group by entry name
        o => new DirEntry(o),                     // Use default Subject for the group
        o => null,                                // select null
        o => !o.outer                             // emit `complete` on unlinked
      )
    )
  }

  get isDirectory() { return true }
}

module.exports = DirSubject