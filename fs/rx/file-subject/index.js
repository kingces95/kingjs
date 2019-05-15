var { 
  ['@kingjs']: {
    fs: {
      rx: { InodeSubject }
    },
    rx: {
      Select,
      DistinctUntilChanged,
    },
  }
} = require('./dependencies')

class FileSubject extends InodeSubject {
  constructor(stats) {
    super(stats, linkStats => linkStats
      [Select](o => o.stats)
      [DistinctUntilChanged](o => o.ctime.getTime())
    )
  }
}

module.exports = FileSubject