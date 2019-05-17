var { 
  fs: { promises: fsp }, 
  ['@kingjs']: {
    fs: {
      rx: { 
        InodeSubject,
        PathSubject
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
    super(stats, pathStats => pathStats
      [Pool](async o => ({
        names: await fsp.readdir(o.path.buffer),
        path: o.path                              // having to pipe the path makes things *very* ugly :(
      }))
      [RollingSelect](
        o => {                          
          var [ current = { }, previous = { } ] = o
          return {
            diff: current.names
              [ZipJoin](previous.names),          // dirEntry[] -> {outer, inner, key}[]
            path: current.path
          }
        }    
      )
      [Log]('DEBUG')                                     // inner = previous, outer = current
      [SelectMany](                               // {outer, inner, key}[] -> {outer, inner, key}
        o => o.diff,
        (o, x) => {
          x.path = o.path
          return x
        }
      )
      [GroupBy](                                  // new = link, next = any, complete = unlink
        o => o.key,                               // group by entry name
        o => o.path.joinWith(o.outer),            // activate group for entry
        o => null,                                // select null
        o => !o.outer                             // emit `complete` on unlinked
      )
    )
  }
}

module.exports = DirSubject