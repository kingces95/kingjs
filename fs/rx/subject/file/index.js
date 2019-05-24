var { 
  ['@kingjs']: {
    fs: {
      rx: {
        subject: { 
          Inode: InodeSubject 
        } 
      }
    },
    rx: {
      Publish,
      DistinctUntilChanged,
    },
  }
} = require('./dependencies')

class FileSubject extends InodeSubject {
  constructor(ino) {
    super(ino, o => o
      [DistinctUntilChanged](o => o.ctime.getTime())
      [Publish]()
    )
  }

  get isFile() { return true }
}

module.exports = FileSubject