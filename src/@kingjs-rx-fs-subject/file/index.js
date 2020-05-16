var { 
  '@kingjs': {
    fs: {
      '-rx': {
        subject: { 
          Inode: InodeSubject 
        } 
      }
    },
    '-rx': {
      Subject,
      Publish,
      DistinctUntilChanged,
    },
  }
} = module[require('@kingjs-module/dependencies')]()

class RealFileSubject extends Subject { }
var createSubject = () => new RealFileSubject()

class FileSubject extends InodeSubject {
  constructor(ino) {
    super(ino, createSubject, o => o
      [DistinctUntilChanged](o => o.ctime.getTime())
      [Publish]()
    )
  }

  get isFile() { return true }
}

module.exports = FileSubject