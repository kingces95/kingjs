var { 
  fs: { promises: fsp }, 
  ['@kingjs']: {
    fs: {
      rx: { 
        InodeSubject,
        LinkSubject
      }
    },
    rx: {
      Log,
      Pool,
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
  constructor(stats) {
    super(stats, linkStats => linkStats
      [Pool](async o => ({
        names: await fsp.readdir(o.link.path),
        parent: o.link
      })))
      [RollingSelect](
        o => o[0].names[ZipJoin](o[1].names)    // dirEntry[] -> {outer, inner, key}[]
      )
      [SelectMany]()                            // {outer, inner, key}[] -> {outer, inner, key}
      [Log]()                                   // inner = previous, outer = current
      [GroupBy](                                // new = link, next = any, complete = unlink
        o => o.key,                             // group by entry name
        name => new LinkSubject(                // activate group for entry
          name, 
          o.link.path
        ),
        o => o.outer,                           // select the current dirEnt
        o => !o.outer                           // emit `complete` on unlinked
      )
  }
}

module.exports = DirSubject