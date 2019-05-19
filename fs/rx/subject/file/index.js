var { 
  assert,
  ['@kingjs']: {
    fs: {
      rx: { 
        subject: { 
          Inode: InodeSubject 
        } 
      }
    },
    rx: {
      DistinctUntilChanged,
    },
  }
} = require('./dependencies')

class FileSubject extends InodeSubject {
  constructor(ino) {
    super(ino, o => o
      [DistinctUntilChanged](o => o.ctime.getTime())
    )
  }

  get isFile() { return true }
}

module.exports = FileSubject