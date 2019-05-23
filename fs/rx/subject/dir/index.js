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
      RollingSelect,
      SelectMany,
      GroupBy,
      Pool
    },
    linq: { 
      ZipJoin, 
    },
  }
} = require('./dependencies')

class DirSubject extends InodeSubject {
  constructor(ino) {
    super(ino, names => names
      [Pool](o => o)                              // Serialize the fetching of directory entries
      [RollingSelect](
        o => o[0][ZipJoin](o[1]))                 // dirEntry[] -> {outer, inner, key}[]
      [SelectMany]()                              // {outer, inner, key}[] -> {outer, inner, key}
      [GroupBy](                                  // new = link, next = any, complete = unlink
        o => o.key,                               // group by entry name
        undefined,                                // Use default Subject for the group
        o => null,                                // select null
        o => !o.outer                             // emit `complete` on unlinked
      )
    )
  }

  get isDirectory() { return true }
}

module.exports = DirSubject